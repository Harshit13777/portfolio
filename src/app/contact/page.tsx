'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  MessageSquare
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { SOCIAL_LINKS } from '@/data/experience';
import { sendLeadToGoogle } from '@/lib/leadDispatcher';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Mobile App (React Native)',
    budget: '$3,000 - $8,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await sendLeadToGoogle({
      source: 'contact_form',
      name: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      budget: formData.budget,
      query: `${formData.projectType} (${formData.budget})`,
      summary: formData.message,
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Page Title */}
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Let’s Build Something Great Together
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Whether you want to build an offline-first mobile app MVP, solve an intricate Bluetooth IoT puzzle, or discuss a high-impact engineering position, drop a note below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider font-mono">
              Direct Channels
            </h3>

            {/* Email */}
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-medium">Email Address</span>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
              >
                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                {SOCIAL_LINKS.email}
              </a>
            </div>

            {/* LinkedIn */}
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-medium">LinkedIn Profile</span>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                linkedin.com/in/harshit13777
              </a>
            </div>

            {/* GitHub */}
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-medium">GitHub Repository</span>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors font-medium"
              >
                <GithubIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                github.com/Harshit13777
              </a>
            </div>

            {/* WhatsApp */}
            <div className="pt-2">
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Directly on WhatsApp
              </a>
            </div>
          </div>

          {/* Timezone & Availability */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-200 font-semibold">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Working Hours & Response</span>
            </div>
            <p className="leading-relaxed">
              Based in India (IST), overlapping easily with Europe, US East Coast, and APAC working schedules.
            </p>
            <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Guaranteed response within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Inquiry Received!</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-zinc-900 dark:text-zinc-200">{formData.name}</strong>. I have received your message regarding <span className="text-emerald-600 dark:text-emerald-400 font-medium">{formData.projectType}</span> and will review the details and respond shortly to <strong className="text-zinc-900 dark:text-zinc-200">{formData.email}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Your Name <span className="text-emerald-600 dark:text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Miller"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Email Address <span className="text-emerald-600 dark:text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Inquiry / Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Mobile App (React Native)">Mobile App MVP (React Native)</option>
                    <option value="IoT & BLE Hardware Integration">IoT & BLE Hardware Integration</option>
                    <option value="Backend APIs & Automation">Backend APIs & Cloud Automation</option>
                    <option value="Full-Time Engineering Role">Full-Time / Contract Engineering Role</option>
                    <option value="Other Consulting">Other Consulting</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Target Budget (If applicable)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  >
                    <option value="< $3,000">Under $3,000 (Small sprint / advisory)</option>
                    <option value="$3,000 - $8,000">$3,000 - $8,000 (MVP feature / app)</option>
                    <option value="$8,000 - $20,000">$8,000 - $20,000 (Full application + backend)</option>
                    <option value="Full-Time Salary">Full-Time Competitive Compensation</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Project Details or Message <span className="text-emerald-600 dark:text-emerald-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your goals, timeline, and current technical architecture..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 font-bold text-sm shadow-md shadow-emerald-500/20 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                Send Inquiry Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
