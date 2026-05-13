// About section — bio, animated stats counters, flip cards
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bioData from '@/data/bio.json';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
      {/* Section heading */}
      <SectionHeading label="About" title="Who am I?" />

      <div className="grid md:grid-cols-2 gap-16 items-center mt-16">
        {/* Left: Animated geometric avatar */}
        <GeometricAvatar />

        {/* Right: Bio + stats */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-slate-300 text-lg leading-relaxed mb-4"
          >
            {bioData.bio}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-slate-400 leading-relaxed mb-10"
          >
            {bioData.bioExtended}
          </motion.p>

          {/* Stats counters */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <StatCounter label="Projects" target={bioData.stats.projects} suffix="" />
            <StatCounter label="Commits" target={bioData.stats.commits} suffix="+" />
            <StatCounter label="Coffees" target={bioData.stats.coffee} suffix="☕" />
          </div>
        </div>
      </div>

      {/* Fun fact flip cards */}
      <div className="mt-20">
        <motion.h3
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl text-white mb-8"
        >
          Fun Facts
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bioData.funFacts.map((fact, i) => (
            <FlipCard key={i} front={fact.front} back={fact.back} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Section heading component ---
export function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <span className="font-mono text-cyan-400 text-sm tracking-widest mb-2 block">
        // {label}
      </span>
      <h2 className="font-heading font-bold text-4xl md:text-5xl text-white">{title}</h2>
      <div className="mt-3 h-px w-24 bg-gradient-to-r from-cyan-500 to-purple-600" />
    </motion.div>
  );
}

// --- Animated stat counter (counts up on scroll) ---
function StatCounter({ label, target, suffix }: { label: string; target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(interval); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(interval);
  }, [inView, target]);

  return (
    <div ref={ref} className="glass-card p-4 text-center">
      <div className="font-heading font-bold text-3xl md:text-4xl gradient-text">
        {count}{suffix}
      </div>
      <div className="text-slate-400 text-sm mt-1">{label}</div>
    </div>
  );
}

// --- Flip card ---
function FlipCard({ front, back, delay }: { front: string; back: string; delay: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="cursor-pointer"
      style={{ perspective: 800, height: 140 }}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
      tabIndex={0}
      role="button"
      aria-label={`Fun fact: ${front}. Click to reveal.`}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', height: '100%' }}
      >
        {/* Front */}
        <div
          className="glass-card flex flex-col items-center justify-center h-full text-center p-4 absolute inset-0"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-3xl mb-2">{front.split(' ')[0]}</span>
          <span className="text-slate-300 text-sm font-heading">{front.slice(front.indexOf(' ') + 1)}</span>
        </div>
        {/* Back */}
        <div
          className="glass-card flex items-center justify-center h-full text-center p-4 absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-purple-900/40"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-slate-300 text-sm leading-relaxed">{back}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Geometric animated avatar ---
function GeometricAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative flex items-center justify-center"
    >
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute w-72 h-72 rounded-full border border-cyan-500/20"
        style={{ borderStyle: 'dashed' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-56 h-56 rounded-full border border-purple-500/20"
        style={{ borderStyle: 'dashed' }}
      />

      {/* Central shape */}
      <div className="w-48 h-48 relative">
        <motion.svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <defs>
            <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Geometric face / abstract shape */}
          <polygon points="100,20 180,70 180,130 100,180 20,130 20,70" fill="url(#avatarGrad)" opacity="0.15" stroke="url(#avatarGrad)" strokeWidth="1.5"/>
          <polygon points="100,40 160,75 160,125 100,160 40,125 40,75" fill="url(#avatarGrad)" opacity="0.1" stroke="url(#avatarGrad)" strokeWidth="1"/>
          {/* Circuit lines */}
          <line x1="100" y1="20" x2="100" y2="40" stroke="#00f5ff" strokeWidth="1.5" opacity="0.6"/>
          <line x1="180" y1="70" x2="160" y2="75" stroke="#00f5ff" strokeWidth="1.5" opacity="0.6"/>
          <line x1="180" y1="130" x2="160" y2="125" stroke="#a855f7" strokeWidth="1.5" opacity="0.6"/>
          <line x1="100" y1="180" x2="100" y2="160" stroke="#a855f7" strokeWidth="1.5" opacity="0.6"/>
          {/* Dots at vertices */}
          <circle cx="100" cy="20" r="4" fill="#00f5ff"/>
          <circle cx="180" cy="70" r="4" fill="#00f5ff"/>
          <circle cx="180" cy="130" r="4" fill="#a855f7"/>
          <circle cx="100" cy="180" r="4" fill="#a855f7"/>
          <circle cx="20" cy="130" r="4" fill="#a855f7"/>
          <circle cx="20" cy="70" r="4" fill="#00f5ff"/>
          {/* Center icon - code brackets */}
          <text x="100" y="115" textAnchor="middle" fontSize="36" fill="url(#avatarGrad)" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
        </motion.svg>

        {/* Floating dots */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-400"
            style={{
              top: `${parseFloat((50 + 48 * Math.sin((deg * Math.PI) / 180)).toFixed(4))}%`,
              left: `${parseFloat((50 + 48 * Math.cos((deg * Math.PI) / 180)).toFixed(4))}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  );
}
