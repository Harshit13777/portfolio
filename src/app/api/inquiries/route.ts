import { NextRequest, NextResponse } from 'next/server';
import { LeadInquiryRequest, LeadInquiryResponse } from '@/types/inquiry';

// In-memory rate limiting map for serverless edge instances (IP -> timestamp array)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes window
  const maxRequests = 5; // Max 5 inquiries per 10 minutes per IP

  const timestamps = (rateLimitMap.get(ip) || []).filter((time) => now - time < windowMs);

  if (timestamps.length >= maxRequests) {
    return false;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    // 1. Server-Side Rate Limiting Check
    if (!checkRateLimit(ip)) {
      return NextResponse.json<LeadInquiryResponse>(
        {
          status: 'error',
          message: 'Too many requests. Please wait a few minutes before submitting again.',
        },
        { status: 429 }
      );
    }

    const body: LeadInquiryRequest & { bot_honeypot?: string } = await req.json();

    // 2. Anti-Spam Honeypot: Drop bot submissions silently
    if (body.bot_honeypot && body.bot_honeypot.trim() !== '') {
      console.warn('[Security] Bot trapped by honeypot field:', ip);
      return NextResponse.json<LeadInquiryResponse>({
        status: 'success',
        message: 'Inquiry processed',
        receivedAt: new Date().toISOString(),
      });
    }

    // 3. Retrieve Private Server Webhook URL (100% hidden from the browser)
    const webhookUrl = process.env.GOOGLE_LEADS_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('[InquiriesAPI] GOOGLE_LEADS_WEBHOOK_URL not configured. Simulating success.');
      return NextResponse.json<LeadInquiryResponse>({
        status: 'success',
        message: 'Simulated server transmission (Webhook URL not configured)',
        receivedAt: new Date().toISOString(),
      });
    }

    // 4. Server-to-Server forward to Google Apps Script
    const googleRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        submittedAt: body.submittedAt || new Date().toISOString(),
      }),
    });

    let googleData: LeadInquiryResponse = {
      status: 'success',
      message: 'Inquiry successfully delivered to Google Sheets and Gmail',
      receivedAt: new Date().toISOString(),
    };

    try {
      googleData = await googleRes.json();
    } catch {
      // Google Apps Script can return text/plain or redirected status
    }

    return NextResponse.json<LeadInquiryResponse>(googleData);
  } catch (error) {
    console.error('[InquiriesAPI] Internal error:', error);
    return NextResponse.json<LeadInquiryResponse>(
      {
        status: 'error',
        message: (error as Error).message || 'Failed to submit inquiry',
      },
      { status: 500 }
    );
  }
}
