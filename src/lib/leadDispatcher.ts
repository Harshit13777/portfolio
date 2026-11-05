import { LeadInquiryRequest, LeadInquiryResponse } from '@/types/inquiry';

export type { LeadInquiryRequest, LeadInquiryResponse };

/**
 * Lead Dispatcher Service
 * 
 * Securely routes all chat queries and contact submissions through your
 * private Next.js Server Route (/api/inquiries).
 * 
 * The Google Apps Script URL is 100% hidden on the server, protected with
 * IP rate limiting and anti-bot honeypots.
 */
export async function sendLeadToGoogle(
  payload: Omit<LeadInquiryRequest, 'submittedAt'> & { submittedAt?: string }
): Promise<LeadInquiryResponse> {
  const fullPayload: LeadInquiryRequest = {
    ...payload,
    submittedAt: payload.submittedAt || new Date().toISOString(),
    pageUrl: payload.pageUrl || (typeof window !== 'undefined' ? window.location.pathname : '/'),
  };

  try {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullPayload),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return {
        status: 'error',
        message: errData.message || `Server returned ${res.status}`,
        receivedAt: new Date().toISOString(),
      };
    }

    const data: LeadInquiryResponse = await res.json();
    return data;
  } catch (error) {
    console.error('[LeadDispatcher] Failed to send inquiry via /api/inquiries:', error);
    return {
      status: 'error',
      message: (error as Error).message || 'Network error',
      receivedAt: new Date().toISOString(),
    };
  }
}
