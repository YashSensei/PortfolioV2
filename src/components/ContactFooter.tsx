"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SocialCard from "./SocialCard";

interface ContactFooterProps {
  accentColor: "blue" | "red";
  /** Whether to use sticky positioning for parallax effect (default: false) */
  sticky?: boolean;
}

/**
 * ContactFooter Component
 * Bento grid style contact footer with different sized cards
 * Dark grainy background, modern asymmetric layout
 */
export default function ContactFooter({ accentColor, sticky = false }: ContactFooterProps) {
  const isBlue = accentColor === "blue";
  // Purple for tech, red for growth
  const accentBg = isBlue ? "bg-violet-600" : "bg-red-500";
  const accentBgHover = isBlue ? "hover:bg-violet-700" : "hover:bg-red-600";
  const accentGlow = isBlue ? "shadow-violet-500/30" : "shadow-red-500/20";

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {/* Large Card - Main CTA (spans 2 cols, 2 rows on desktop) */}
          <motion.a
            href="mailto:yashagrawalrkt123@gmail.com"
            className={`col-span-2 row-span-2 rounded-3xl ${accentBg} ${accentBgHover} p-6 md:p-8 flex flex-col justify-between min-h-[280px] md:min-h-[320px] cursor-pointer group transition-all duration-300 shadow-lg ${accentGlow}`}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                LET&apos;S BUILD
                <br />
                TOGETHER
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm md:text-base font-medium">
                Click to email me
              </span>
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors"
                whileHover={{ rotate: 45 }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.a>

          {/* Twitter/X Card */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <SocialCard
              platform="twitter"
              name="Yash Agrawal"
              handle="Yash__Sensei"
              profileImage="https://pbs.twimg.com/profile_images/1872887556213243904/pQglvqLI_400x400.jpg"
              href="https://x.com/Yash__Sensei"
              accentColor={accentColor}
            />
          </motion.div>

          {/* GitHub Card */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <SocialCard
              platform="github"
              name="Yash Agrawal"
              handle="YashSensei"
              profileImage="https://avatars.githubusercontent.com/u/141723105?v=4"
              href="https://github.com/YashSensei"
              accentColor={accentColor}
            />
          </motion.div>

          {/* Email Card */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <SocialCard
              platform="email"
              name="Yash Agrawal"
              handle="yashagrawalrkt123@gmail.com"
              profileImage="https://avatars.githubusercontent.com/u/141723105?v=4"
              href=""
              accentColor={accentColor}
            />
          </motion.div>

          {/* LinkedIn Card */}
          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <SocialCard
              platform="linkedin"
              name="Yash Agrawal"
              handle="yash-agrawal-208841307"
              profileImage="https://media.licdn.com/dms/image/v2/D5603AQHFbPrHmDIa3A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728044961785?e=1741824000&v=beta&t=JRqbVT1Ae2kh_4VJ9lCkQEQH6rnr1TGYHdYdMNJKg3A"
              href="https://linkedin.com/in/yash-agrawal-208841307"
              accentColor={accentColor}
            />
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-8 pt-6 border-t border-gray-800/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-wider text-gray-500">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              BACK TO HOME
            </Link>
            <span className="text-gray-600">© 2025 YASH AGRAWAL</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
