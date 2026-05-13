// Projects section — special showcase with SVG frames, 3D tilt, tech badges
'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { IconExternalLink, IconBrandGithub, IconStar } from '@tabler/icons-react';
import { SectionHeading } from '@/components/sections/About';
import projectsData from '@/data/projects.json';
import Image from 'next/image';

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
      <SectionHeading label="Projects" title="Things I've built" />

      <div className="mt-16 grid md:grid-cols-2 gap-8">
        {projectsData.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

// --- 3D tilt project card ---
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projectsData)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt via Framer Motion spring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isFeatured = project.type === 'dance' || project.type === 'bounce';

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card overflow-hidden group relative"
      >
        {/* Featured ribbon */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold">
            <IconStar size={10} />
            Featured
          </div>
        )}

        {/* SVG frame for special projects */}
        {project.svgFrame && (
          <SvgFrame src={project.svgFrame} type={project.type} />
        )}

        {/* Image placeholder */}
        <div
          className={`relative h-48 bg-gradient-to-br ${project.accent} overflow-hidden`}
          style={{ opacity: 0.15 }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-30"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="p-6">
          {/* Title + accent dot */}
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.accentSolid }}
            />
            <h3 className="font-heading font-bold text-white text-xl">{project.title}</h3>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs border font-mono"
                style={{ borderColor: project.accentSolid + '40', color: project.accentSolid }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ripple flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-heading font-semibold text-white transition-all hover:opacity-80"
              style={{ background: `linear-gradient(135deg, ${project.accentSolid}, #a855f7)` }}
            >
              <IconExternalLink size={14} />
              Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ripple flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-heading text-slate-300 border border-white/10 hover:border-white/30 hover:text-white transition-all"
            >
              <IconBrandGithub size={14} />
              GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- SVG Frame shown above special project cards ---
function SvgFrame({ src, type }: { src: string; type: string }) {
  return (
    <div
      className={`relative overflow-hidden px-4 pt-4 group-hover:${
        type === 'dance' ? '[&_*]:![animation-duration:0.4s]' : '[&_*]:![animation-duration:0.45s]'
      }`}
      style={{ height: 80, background: 'rgba(0,0,0,0.3)' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
}
