'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  MessageSquare,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { sendLeadToGoogle } from '@/lib/leadDispatcher';
import { soundFx } from '@/lib/soundFx';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  showLeadForm?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'bot',
    text: "Hi! I'm Harshit's portfolio assistant. Ask me anything about his React Native, BLE IoT projects, full-stack architectures, or availability!",
    time: 'Just now',
  },
];

const SUGGESTED_QUESTIONS = [
  "What is Harshit's experience with BLE & IoT?",
  "Tell me about his React Native production apps",
  "Is he available for freelance contracts?",
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function PortfolioChatbotModal({ isOpen, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Lead capture state
  const [leadEmail, setLeadEmail] = useState('');
  const [leadName, setLeadName] = useState('');
  const [isSendingLead, setIsSendingLead] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    soundFx.playChirpBeep();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Intelligent context-aware client response synthesis
    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply = "Harshit is a Full-Stack Engineer with 4+ years of experience specializing in React Native mobile development, Bluetooth Low Energy (BLE) hardware integrations, and high-throughput Python/Django cloud backends.";
      let promptLead = false;

      if (lower.includes('ble') || lower.includes('bluetooth') || lower.includes('hardware') || lower.includes('iot')) {
        reply = "Harshit has engineered direct BLE GATT streaming layers, custom packet chunking with CRC verification, and fault-tolerant reconnection state machines for commercial EV chargers and medical telemetry devices.";
      } else if (lower.includes('react native') || lower.includes('mobile') || lower.includes('app')) {
        reply = "Harshit builds cross-platform React Native apps with Expo, offline-first SQLite/SQLCipher caching, Redux Toolkit state, and smooth 60fps animations. His apps have served 8,500+ active travelers.";
      } else if (lower.includes('freelance') || lower.includes('hire') || lower.includes('contract') || lower.includes('rate') || lower.includes('availability') || lower.includes('cost')) {
        reply = "Harshit is currently open for select freelance contracts, MVP builds (typically 3-6 week sprints), and high-impact engineering advisory roles.";
        promptLead = true;
      } else if (lower.includes('backend') || lower.includes('django') || lower.includes('database') || lower.includes('cloud')) {
        reply = "On the backend, Harshit designs high-concurrency RESTful APIs in Django REST and Node.js, orchestrates Celery async worker queues, and optimizes PostgreSQL & Redis databases on AWS.";
      } else {
        reply = `Thanks for asking! Harshit specializes in turning complex engineering ideas into production systems. Would you like to leave your email so he can get in touch with you directly?`;
        promptLead = true;
      }

      setIsTyping(false);
      soundFx.playChirpBeep();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showLeadForm: promptLead && !leadSent,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 650);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail.trim()) return;

    setIsSendingLead(true);
    soundFx.playTeleportBlip();

    const transcript = messages.map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');

    await sendLeadToGoogle({
      source: 'chatbot',
      name: leadName || 'Portfolio Visitor',
      email: leadEmail,
      query: messages[messages.length - 1]?.text || 'Chat Inquiry',
      summary: `Inquiry via portfolio AI chatbot about: ${messages[messages.length - 1]?.text}`,
      fullChat: transcript,
    });

    setIsSendingLead(false);
    setLeadSent(true);

    const confirmationMsg: Message = {
      id: Date.now().toString(),
      sender: 'bot',
      text: `🎉 Thank you! I've dispatched your details and query directly to Harshit's Gmail and logged it in his inquiries sheet. He will follow up with you at ${leadEmail} shortly!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, confirmationMsg]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative w-full max-w-lg h-[620px] max-h-[90vh] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Harshit’s AI Co-Pilot
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                Direct Sync to Google Sheets & Gmail
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-xs shadow-xs font-medium'
                    : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 rounded-bl-xs border border-zinc-200/60 dark:border-zinc-700/60'
                }`}
              >
                {m.text}
              </div>

              {/* Inline Lead Capture Card */}
              {m.showLeadForm && !leadSent && (
                <div className="w-full max-w-[90%] mt-2 p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send query directly to Harshit’s Gmail</span>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Name (Optional)"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-500/30 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none focus:border-emerald-500"
                    />
                    <div className="flex gap-1.5">
                      <input
                        type="email"
                        required
                        placeholder="Your Email (e.g. name@company.com)"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-500/30 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        disabled={isSendingLead}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors disabled:opacity-50"
                      >
                        {isSendingLead ? 'Sending...' : 'Notify'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono px-1">
                {m.time}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono px-2 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] ml-1">Analyzing engineering context...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/20">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about BLE, React Native, or contract availability..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 transition-all cursor-pointer shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
