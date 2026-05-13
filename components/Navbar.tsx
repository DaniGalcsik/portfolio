// Navbar — fixed top, collapses on scroll, with theme toggle
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useTheme } from '@/components/Providers';
import { IconSun, IconMoon, IconMenu2, IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import navLinks from '@/data/nav.json';

export default function Navbar() {
  const { scrollY, isAtTop } = useScrollPosition();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        !isAtTop
          ? 'glass-card mx-4 mt-3 rounded-xl border border-cyan-500/20'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo — click 5 times for confetti easter egg */}
        <LogoButton />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </motion.button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 text-cyan-400"
            aria-label="Toggle menu"
          >
            {menuOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass-card mx-4 mb-3 rounded-xl"
          >
            <ul className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-slate-300 hover:text-cyan-400 transition-colors py-1 font-heading text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// --- NavLink with underline draw animation ---
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative text-slate-300 hover:text-cyan-400 transition-colors text-sm font-heading group"
    >
      {label}
      {/* Underline draw */}
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
    </a>
  );
}

// --- Logo with confetti easter egg ---
function LogoButton() {
  const [clicks, setClicks] = useState(0);

  const handleClick = async () => {
    const next = clicks + 1;
    setClicks(next);

    if (next >= 5) {
      setClicks(0);
      // Dynamically import canvas-confetti to keep bundle lean
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.1 },
        colors: ['#00f5ff', '#a855f7', '#f472b6', '#fbbf24'],
      });
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="font-heading font-bold text-xl gradient-text cursor-pointer select-none"
      aria-label="Home — click 5 times for a surprise"
    >
      &lt;DK /&gt;
    </motion.button>
  );
}
