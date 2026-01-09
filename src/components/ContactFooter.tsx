"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface ContactFooterProps {
  accentColor: "blue" | "red";
}

interface FormData {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

const PROJECT_TYPES = {
  blue: ["WEB APP", "API", "FULL STACK", "CONNECT"],
  red: ["STRATEGY", "GROWTH", "PRODUCT", "CONNECT"],
};

/**
 * ContactFooter Component
 * Cinematic contact form footer inspired by seated.nyc
 * Dark grainy background, bold typography, minimal form fields
 * Scrolls up with parallax effect
 */
export default function ContactFooter({ accentColor }: ContactFooterProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    company: "",
    phone: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeType, setActiveType] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual form submission to email service
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        company: "",
        phone: "",
        email: "",
        projectType: "",
        budget: "",
        message: "",
      });
      setActiveType(null);
    }, 3000);
  };

  const handleTypeClick = (type: string) => {
    setActiveType(type);
    setFormData((prev) => ({ ...prev, projectType: type }));
  };

  return (
    <footer className="sticky bottom-0 left-0 right-0 bg-[#0a0a0a] overflow-hidden z-10">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle scratches/lines effect */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 100px,
            rgba(255,255,255,0.1) 100px,
            rgba(255,255,255,0.1) 101px
          )`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
        {/* Main Headline */}
        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white text-center mb-10 tracking-tight leading-none"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          LET&apos;S BUILD
          <br />
          TOGETHER!
        </motion.h2>

        {/* Project Type Categories */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-10 text-sm md:text-base tracking-widest"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {PROJECT_TYPES[accentColor].map((type, i) => (
            <span key={type} className="flex items-center">
              <button
                type="button"
                onClick={() => handleTypeClick(type)}
                className={`transition-colors duration-200 ${
                  activeType === type ? "text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {type}
              </button>
              {i < PROJECT_TYPES[accentColor].length - 1 && (
                <span className="text-gray-600 mx-3 md:mx-4">/</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-6">
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="FULL NAME"
                required
                className="w-full bg-transparent border-b border-gray-700 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors text-sm tracking-wider"
              />
            </div>

            {/* Company */}
            <div className="relative">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="COMPANY NAME"
                className="w-full bg-transparent border-b border-gray-700 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors text-sm tracking-wider"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="PHONE"
                className="w-full bg-transparent border-b border-gray-700 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors text-sm tracking-wider"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="EMAIL"
                required
                className="w-full bg-transparent border-b border-gray-700 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors text-sm tracking-wider"
              />
            </div>

            {/* Project Type */}
            <div className="relative">
              <input
                type="text"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                placeholder="PROJECT TYPE"
                className="w-full bg-transparent border-b border-gray-700 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors text-sm tracking-wider"
              />
            </div>

            {/* Budget */}
            <div className="relative">
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="BUDGET"
                className="w-full bg-transparent border-b border-gray-700 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors text-sm tracking-wider"
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="ENTER PROJECT DETAILS"
              rows={1}
              required
              className="w-full bg-transparent border-b border-gray-700 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors text-sm tracking-wider resize-none"
            />
          </div>

          {/* Tagline */}
          <p className="text-center text-gray-500 text-xs md:text-sm tracking-wide mb-8 max-w-3xl mx-auto leading-relaxed uppercase">
            {accentColor === "blue"
              ? "I believe in clean code, scalable architecture, and delivering solutions that exceed expectations. Let's build something remarkable."
              : "I thrive on challenges and deliver growth strategies that create lasting impact. Let's scale your vision together."}
          </p>

          {/* Submit Button - Oval style */}
          <div className="text-center">
            <motion.button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className="relative px-16 py-5 rounded-full border border-gray-600 text-gray-400 text-sm tracking-[0.3em] uppercase overflow-hidden group hover:border-gray-400 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">
                {isSubmitting ? "SENDING..." : isSubmitted ? "SENT!" : "SUBMIT"}
              </span>
            </motion.button>
          </div>
        </motion.form>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-6 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs tracking-wider">
            {/* Left side - Social & Email */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 md:gap-8">
              <a
                href="https://x.com/Yash__Sensei"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
              >
                @YASH__SENSEI
              </a>
              <a
                href="mailto:yashagrawalrkt123@gmail.com"
                className="text-gray-500 hover:text-white transition-colors"
              >
                YASHAGRAWALRKT123@GMAIL.COM
              </a>
            </div>

            {/* Right side - Links & Copyright */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-8">
              <a
                href="https://github.com/YashSensei"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
              >
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/yash-agrawal-208841307"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
              >
                LINKEDIN
              </a>
              <Link href="/" className="text-gray-500 hover:text-white transition-colors">
                HOME
              </Link>
              <span className="text-gray-600">@2025 YASH AGRAWAL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
