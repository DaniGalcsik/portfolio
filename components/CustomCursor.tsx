// Custom animated cursor that reacts to hoverable elements
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // Only visible after mount on non-touch devices (avoids SSR/hydration mismatch)
  const [visible, setVisible] = useState(false);

  // Outer ring: spring-smoothed position + scale
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const scaleValue = useMotionValue(1);
  const springScale = useSpring(scaleValue, { stiffness: 400, damping: 25 });

  // Inner dot: exact position (no spring)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const cursorRef = useRef<HTMLDivElement>(null);

  // Track mouse directly via MotionValues — zero React re-renders on mouse move
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [cursorX, cursorY, dotX, dotY]);

  // Single delegated listener for hover detection (no per-element listeners)
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const hoverable = (e.target as Element).closest('a, button, [data-cursor]');
      if (hoverable) {
        scaleValue.set(1.8);
        if (cursorRef.current) {
          cursorRef.current.style.borderColor = '#a855f7';
          cursorRef.current.style.backgroundColor = 'rgba(168,85,247,0.1)';
        }
      } else {
        scaleValue.set(1);
        if (cursorRef.current) {
          cursorRef.current.style.borderColor = '#00f5ff';
          cursorRef.current.style.backgroundColor = 'transparent';
        }
      }
    };
    document.addEventListener('mouseover', onOver, { passive: true });
    return () => document.removeEventListener('mouseover', onOver);
  }, [scaleValue]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — springs behind, scale on hover */}
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
          scale: springScale,
          transition: 'border-color 0.2s, background-color 0.2s',
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
