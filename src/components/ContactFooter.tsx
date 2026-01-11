"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ContactFooterProps {
  accentColor: "blue" | "red";
  /** Whether to use sticky positioning for parallax effect (default: false) */
  sticky?: boolean;
}

/**
 * ContactFooter Component
 * Cinematic contact footer with social links and contact info
 * Dark grainy background, bold typography
 */
export default function ContactFooter({ accentColor, sticky = false }: ContactFooterProps) {
  const accentColorClass = accentColor === "blue" ? "text-blue-400" : "text-red-400";
  const accentHoverClass = accentColor === "blue" ? "hover:text-blue-400" : "hover:text-red-400";
  const accentBorderClass =
    accentColor === "blue"
      ? "border-blue-500/30 hover:border-blue-500"
      : "border-red-500/30 hover:border-red-500";

  return (
    <footer
      className={`${sticky ? "sticky bottom-0 z-10" : "relative"} left-0 right-0 bg-[#0a0a0a] overflow-hidden`}
    >
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Main Headline */}
        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white text-center mb-6 tracking-tight leading-none"
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

        {/* Tagline */}
        <motion.p
          className="text-center text-gray-400 text-sm md:text-base tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {accentColor === "blue"
            ? "I believe in clean code, scalable architecture, and delivering solutions that exceed expectations."
            : "I thrive on challenges and deliver growth strategies that create lasting impact."}
        </motion.p>

        {/* Contact Links */}
        <motion.div
          className="flex flex-col items-center gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Email - Primary CTA */}
          <motion.a
            href="mailto:yashagrawalrkt123@gmail.com"
            className={`group flex items-center gap-3 px-8 py-4 rounded-full border ${accentBorderClass} bg-white/5 transition-all duration-300`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg
              className={`w-5 h-5 ${accentColorClass}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-white font-medium tracking-wide">
              yashagrawalrkt123@gmail.com
            </span>
          </motion.a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {/* Twitter/X */}
            <motion.a
              href="https://x.com/Yash__Sensei"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-full border border-gray-700 hover:border-gray-500 bg-white/5 text-gray-400 ${accentHoverClass} transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm font-medium">@Yash__Sensei</span>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/YashSensei"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-full border border-gray-700 hover:border-gray-500 bg-white/5 text-gray-400 ${accentHoverClass} transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="text-sm font-medium">GitHub</span>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com/in/yash-agrawal-208841307"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-full border border-gray-700 hover:border-gray-500 bg-white/5 text-gray-400 ${accentHoverClass} transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-sm font-medium">LinkedIn</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-wider text-gray-500">
            <Link href="/" className="hover:text-white transition-colors">
              ← BACK TO HOME
            </Link>
            <span className="text-gray-600">© 2025 YASH AGRAWAL</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
