/**
 * Inquiry Submission Types & Contracts
 * 
 * Formal API request and response interfaces for transmitting
 * portfolio chatbot queries and contact form leads to Google Sheets and Gmail.
 */

export type InquirySource = 'chatbot' | 'contact_form' | 'service_blueprint';

/**
 * Payload sent from Next.js client to the Google Apps Script Webhook
 */
export interface LeadInquiryRequest {
  source: InquirySource;         // 'chatbot' | 'contact_form' | 'service_blueprint'
  name: string;                  // Visitor full name or company
  email: string;                 // Visitor contact email
  query?: string;                // Primary inquiry / question / subject
  projectType?: string;          // Selected project type (e.g. 'Mobile App (React Native)', 'IoT Telemetry')
  budget?: string;               // Estimated budget range (e.g. '$3,000 - $8,000')
  summary?: string;              // Message or AI-generated conversation summary
  fullChat?: string;             // Complete conversation transcript if submitted via chatbot
  submittedAt: string;           // ISO 8601 timestamp (e.g. '2026-11-06T00:05:00.000Z')
  pageUrl?: string;              // Originating URL pathname (e.g. '/' or '/contact' or '/services')
}

/**
 * Expected JSON response returned by the Google Apps Script Webhook
 */
export interface LeadInquiryResponse {
  status: 'success' | 'error';
  message?: string;
  rowId?: number;
  receivedAt?: string;
}
