// Terminal-style loading screen shown on first visit
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  '> Initializing portfolio...',
  '> Loading components       [OK]',
  '> Mounting animations      [OK]',
  '> Connecting to backend    [OK]',
  '> Brewing coffee           [☕]',
  '> Compiling awesomeness... ██████████ 100%',
  '> Welcome, human.',
];

export default function LoadingScreen() {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show loading screen only once per session
    if (sessionStorage.getItem('portfolio-loaded')) {
      setVisible(false);
      return;
    }

    let i = 0;
    const addLine = () => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
        setTimeout(addLine, 320);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem('portfolio-loaded', '1');
          }, 500);
        }, 400);
      }
    };
    setTimeout(addLine, 300);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9998] bg-[#020818] flex items-center justify-center scanline-overlay"
        >
          <div className="w-full max-w-lg px-6">
            {/* Terminal window chrome */}
            <div className="rounded-xl border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/10">
              <div className="flex items-center gap-2 px-4 py-3 bg-navy-900/80 border-b border-cyan-500/20">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
                <span className="ml-3 text-xs text-slate-500 font-mono">portfolio.exe</span>
              </div>

              <div className="bg-black/90 p-6 min-h-[220px] font-mono text-sm">
                {lines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-1"
                    style={{ color: line.includes('[OK]') ? '#00f5ff' : line.includes('[☕]') ? '#fbbf24' : '#a0aec0' }}
                  >
                    {line}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                {!done && (
                  <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-1" />
                )}
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: done ? 1 : 0 }}
              className="text-center text-slate-500 text-xs mt-4 font-mono"
            >
              © Kovács Dániel
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
