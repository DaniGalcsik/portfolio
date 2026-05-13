// Hero section — animated name, typing effect, particle bg, CTAs
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IconDownload, IconArrowRight, IconChevronDown } from '@tabler/icons-react';
import bioData from '@/data/bio.json';
import ParticleBackground from '@/components/ParticleBackground';

// Roles to cycle through in the typing animation
const ROLES = ['Frontend Developer', 'IT Student', 'Problem Solver', 'Gamer', 'Coffee Addict'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typing animation logic
  useEffect(() => {
    const current = ROLES[roleIndex];

    if (!isDeleting) {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 80);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, isDeleting, roleIndex]);

  // Word-by-word reveal for name
  const nameParts = bioData.fullName.split(' ');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Particle background */}
      <ParticleBackground />

      {/* Radial glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-cyan-400 font-mono text-sm md:text-base mb-4 tracking-widest"
        >
          &gt; Szia! I&apos;m
        </motion.p>

        {/* Name with glitch effect — word by word reveal */}
        <h1 className="font-heading font-bold leading-none mb-6">
          {nameParts.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.2, ease: 'easeOut' }}
              className="inline-block mr-4"
            >
              <span
                className={`glitch-wrapper text-5xl md:text-7xl lg:text-8xl ${
                  i === 1 ? 'gradient-text' : 'text-white'
                }`}
                data-text={word}
              >
                {word}
              </span>
            </motion.span>
          ))}
        </h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-2 mb-8 h-10"
        >
          <span className="text-slate-400 text-lg md:text-2xl font-heading">/&gt;</span>
          <span className="text-cyan-400 text-lg md:text-2xl font-heading font-semibold">
            {displayed}
          </span>
          <span className="w-0.5 h-6 bg-cyan-400 animate-pulse" />
        </motion.div>

        {/* Bio short */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {bioData.bio}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="btn-ripple px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-heading font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            <IconArrowRight size={16} className="inline mr-2" />
            View Projects
          </MagneticButton>

          <MagneticButton
            href={bioData.cv}
            className="btn-ripple px-8 py-4 rounded-xl border border-cyan-500/30 text-cyan-400 font-heading font-semibold text-sm hover:bg-cyan-500/10 hover:border-cyan-500/60 transition-all"
            download
          >
            <IconDownload size={16} className="inline mr-2" />
            Download CV
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <IconChevronDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}

// --- Magnetic button wrapper ---
function MagneticButton({
  children,
  href,
  className,
  download,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
  download?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      download={download}
    >
      {children}
    </a>
  );
}
