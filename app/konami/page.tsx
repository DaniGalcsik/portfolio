// Konami code easter egg route — triggered by ↑↑↓↓←→←→BA
// Activates a retro 8-bit mode toggle
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKonamiCode } from '@/hooks/useKonamiCode';

export default function KonamiPage() {
  const router = useRouter();

  // Toggle retro 8-bit class on document
  useEffect(() => {
    document.documentElement.classList.toggle('retro-8bit');
    // Redirect back home after a beat
    const timeout = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: '#000',
        fontFamily: '"Courier New", monospace',
        color: '#0f0',
      }}
    >
      <div className="text-center space-y-4 p-8">
        <div style={{ fontSize: '4rem' }}>👾</div>
        <h1 style={{ fontSize: '2rem', textShadow: '0 0 10px #0f0' }}>
          CHEAT CODE ACTIVATED
        </h1>
        <p style={{ color: '#0f0', opacity: 0.8 }}>
          ↑↑↓↓←→←→BA — Retro mode toggled!
        </p>
        <p style={{ color: '#0f0', opacity: 0.5, fontSize: '0.8rem' }}>
          Redirecting to portfolio in 3 seconds...
        </p>
        <div style={{ marginTop: '2rem', fontSize: '3rem', letterSpacing: '0.5rem' }}>
          {'[■■■■■■■■■■]'}
        </div>
      </div>
    </div>
  );
}
