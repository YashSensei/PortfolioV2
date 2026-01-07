"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Tech section landing page
 * User arrives here after choosing the Blue pill
 */
export default function TechPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Entry animation - fade in from blue wash */}
      <motion.div
        className="fixed inset-0 bg-blue-500 z-50 pointer-events-none"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Content container */}
      <motion.div
        className="flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Blue glow accent */}
        <motion.div
          className="w-4 h-4 rounded-full bg-blue-500 mb-8"
          animate={{
            boxShadow: [
              "0 0 20px 5px rgba(59, 130, 246, 0.5)",
              "0 0 40px 10px rgba(59, 130, 246, 0.8)",
              "0 0 20px 5px rgba(59, 130, 246, 0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] text-blue-400 mb-4 uppercase">
          Tech
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-md mb-12 font-light">
          You chose the blue pill. Welcome to the technical side.
        </p>

        {/* Placeholder content - to be expanded */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl">
          {["Projects", "Skills", "Experience"].map((item, index) => (
            <motion.div
              key={item}
              className="p-6 border border-blue-500/30 rounded-lg bg-blue-500/5 hover:bg-blue-500/10 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            >
              <h3 className="text-lg font-medium text-blue-300 mb-2">{item}</h3>
              <p className="text-sm text-white/40">Coming soon...</p>
            </motion.div>
          ))}
        </div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16"
        >
          <Link
            href="/"
            className="text-sm text-white/40 hover:text-blue-400 transition-colors tracking-wider"
          >
            ← Choose again
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
