// Custom animated cursor that reacts to hoverable elements
'use client';

import { useEffect, useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const isHovering = useRef(false);

  // Smoothly spring the cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  // Dot follows exact position
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const scale = useRef(1);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cursorX.set(x - 20);
    cursorY.set(y - 20);
    dotX.set(x - 4);
    dotY.set(y - 4);
  }, [x, y, cursorX, cursorY, dotX, dotY]);

  // Detect hoverable elements
  useEffect(() => {
    const addHover = () => {
      isHovering.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${springX.get()}px, ${springY.get()}px) scale(1.8)`;
        cursorRef.current.style.borderColor = '#a855f7';
        cursorRef.current.style.backgroundColor = 'rgba(168,85,247,0.1)';
      }
    };
    const removeHover = () => {
      isHovering.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.borderColor = '#00f5ff';
        cursorRef.current.style.backgroundColor = 'transparent';
      }
    };

    const targets = document.querySelectorAll('a, button, [data-cursor]');
    targets.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, [springX, springY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring — springs behind */}
      <motion.div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid #00f5ff',
          pointerEvents: 'none',
          zIndex: 9999,
          x: springX,
          y: springY,
          transition: 'border-color 0.2s, background-color 0.2s, transform 0.2s',
          mixBlendMode: 'difference',
        }}
      />
      {/* Inner dot — exact position */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#00f5ff',
          pointerEvents: 'none',
          zIndex: 9999,
          x: dotX,
          y: dotY,
        }}
      />
    </>
  );
}
