// Experience / Timeline section — alternating animated timeline
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IconBriefcase, IconSchool, IconCode } from '@tabler/icons-react';
import { SectionHeading } from '@/components/sections/About';
import experienceData from '@/data/experience.json';
import { formatDate } from '@/lib/utils';

const TYPE_ICONS = {
  work: IconBriefcase,
  education: IconSchool,
  project: IconCode,
};
const TYPE_COLORS = {
  work: '#00f5ff',
  education: '#a855f7',
  project: '#f472b6',
};

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 max-w-4xl mx-auto">
      <SectionHeading label="Journey" title="My timeline" />

      <div className="relative mt-16">
        {/* Vertical line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/30 to-cyan-500/0" />

        <div className="flex flex-col gap-12">
          {experienceData.map((entry, i) => (
            <TimelineItem key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  entry,
  index,
}: {
  entry: (typeof experienceData)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;
  const Icon = TYPE_ICONS[entry.type as keyof typeof TYPE_ICONS] ?? IconCode;
  const color = TYPE_COLORS[entry.type as keyof typeof TYPE_COLORS] ?? '#00f5ff';

  return (
    <div ref={ref} className="relative grid grid-cols-2 gap-8 items-center">
      {/* Left side content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 0 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={isLeft ? 'col-start-1' : 'col-start-1 opacity-0 pointer-events-none'}
      >
        {isLeft && <TimelineCard entry={entry} color={color} Icon={Icon} />}
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
        style={{ borderColor: color, backgroundColor: '#020818' }}
      />

      {/* Right side content */}
      <motion.div
        initial={{ opacity: 0, x: !isLeft ? 60 : 0 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={!isLeft ? 'col-start-2' : 'col-start-2 opacity-0 pointer-events-none'}
      >
        {!isLeft && <TimelineCard entry={entry} color={color} Icon={Icon} />}
      </motion.div>
    </div>
  );
}

function TimelineCard({
  entry,
  color,
  Icon,
}: {
  entry: (typeof experienceData)[0];
  color: string;
  Icon: React.ElementType;
}) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} style={{ color }} />
        <span className="text-xs font-mono" style={{ color }}>
          {formatDate(entry.startDate)} — {formatDate(entry.endDate)}
        </span>
      </div>
      <h3 className="font-heading font-bold text-white text-base mb-0.5">{entry.title}</h3>
      <p className="text-slate-400 text-sm mb-3">
        {entry.organization} · {entry.location}
      </p>
      <p className="text-slate-500 text-xs leading-relaxed mb-3">{entry.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs rounded font-mono"
            style={{ background: color + '15', color }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
