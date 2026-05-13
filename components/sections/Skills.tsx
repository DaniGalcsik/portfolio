// Skills section — categorized skills with GSAP-animated progress bars + devicons
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '@/components/sections/About';
import skillsData from '@/data/skills.json';
import { getDeviconUrl } from '@/lib/utils';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend', color: 'from-cyan-500 to-blue-500' },
  { key: 'backend', label: 'Backend', color: 'from-purple-500 to-pink-500' },
  { key: 'tools', label: 'Tools', color: 'from-emerald-500 to-teal-400' },
  { key: 'languages', label: 'Languages', color: 'from-orange-500 to-amber-400' },
] as const;

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 max-w-7xl mx-auto">
      <SectionHeading label="Skills" title="What I work with" />

      <div className="mt-16 grid md:grid-cols-2 gap-10">
        {CATEGORIES.map((cat) => (
          <SkillCategory
            key={cat.key}
            label={cat.label}
            color={cat.color}
            skills={(skillsData as Record<string, { name: string; icon: string; level: number }[]>)[cat.key]}
          />
        ))}
      </div>
    </section>
  );
}

// --- Skill category card ---
function SkillCategory({
  label,
  color,
  skills,
}: {
  label: string;
  color: string;
  skills: { name: string; icon: string; level: number }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6"
    >
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-gradient-to-r ${color} text-white mb-6`}>
        {label}
      </div>
      <div className="space-y-5">
        {skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} barColor={color} />
        ))}
      </div>
    </motion.div>
  );
}

// --- Individual skill bar with icon, name, GSAP animation ---
function SkillBar({
  skill,
  barColor,
}: {
  skill: { name: string; icon: string; level: number };
  barColor: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { width: '0%' },
      {
        width: `${skill.level}%`,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [skill.level]);

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {/* Devicon */}
          <motion.div
            whileHover={{ scale: 1.3, y: -4 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="w-6 h-6 relative"
            title={skill.name}
          >
            {/* Using img for external SVG from CDN — Next Image doesn't support arbitrary CDN without config */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getDeviconUrl(skill.icon)}
              alt={skill.name}
              width={24}
              height={24}
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </motion.div>
          <span className="text-slate-300 text-sm font-heading">{skill.name}</span>
        </div>
        <span className="text-slate-500 text-xs font-mono">{skill.level}%</span>
      </div>

      {/* Bar track */}
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={`h-full rounded-full bg-gradient-to-r ${barColor} shadow-sm`}
          style={{ width: 0 }}
        />
      </div>
    </motion.div>
  );
}
