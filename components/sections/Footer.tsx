// Footer — ASCII art, back to top, credits
'use client';

import { motion } from 'framer-motion';
import { IconArrowUp } from '@tabler/icons-react';

const ASCII_COMPUTER = `
 ___________
|           |
|  >_  OK  |
|___________|
  |       |
  |_______|
   |     |
  _|_____|_
 /         \\
`;

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* ASCII art */}
        <pre
          className="font-mono text-slate-600 text-xs leading-tight select-none"
          aria-hidden="true"
        >
          {ASCII_COMPUTER}
        </pre>

        {/* Logo */}
        <div className="font-heading font-bold text-2xl gradient-text">&lt;DK /&gt;</div>

        {/* Credits */}
        <p className="text-slate-500 text-sm text-center">
          Built with ❤️ and too much coffee by{' '}
          <span className="text-cyan-400">Kovács Dániel</span> — Hungary 🇭🇺
          <br />
          <span className="text-slate-600 text-xs">
            Next.js · Tailwind CSS · Framer Motion · GSAP · tsParticles
          </span>
        </p>

        {/* Back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-ripple flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors text-sm font-heading"
          aria-label="Back to top"
        >
          <IconArrowUp size={14} />
          Back to top
        </motion.button>

        <p className="text-slate-700 text-xs font-mono">
          © {new Date().getFullYear()} · danikovacs.dev
        </p>
      </div>
    </footer>
  );
}
