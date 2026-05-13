// Debug Rush minigame — click bugs before they hit the bottom
'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconBug, IconX, IconMinimize, IconMaximize, IconRefresh } from '@tabler/icons-react';
import { SectionHeading } from '@/components/sections/About';

// ---- Types ----
interface Bug {
  id: number;
  x: number;
  y: number;
  speed: number;
  emoji: string;
}
interface Score {
  initials: string;
  score: number;
}

const BUG_EMOJIS = ['🐛', '🦗', '🪲', '🐞', '🦟'];
const MAX_LIVES = 3;
const LEADERBOARD_KEY = 'debug-rush-lb';

// ---- Leaderboard helpers ----
function getLeaderboard(): Score[] {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) ?? '[]');
  } catch {
    return [];
  }
}
function saveScore(score: number) {
  const initials = prompt('Enter your initials (3 chars):')?.toUpperCase().slice(0, 3) ?? '???';
  const lb = getLeaderboard();
  lb.push({ initials, score });
  lb.sort((a, b) => b.score - a.score);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb.slice(0, 5)));
}

export default function Minigame() {
  const [minimized, setMinimized] = useState(false);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const bugIdRef = useRef(0);
  const frameRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);
  const difficultyRef = useRef(1);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef(false);
  const livesRef = useRef(MAX_LIVES);
  const scoreRef = useRef(0);

  // Sync refs with state
  useEffect(() => { runningRef.current = running; }, [running]);
  useEffect(() => { livesRef.current = lives; }, [lives]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  const startGame = useCallback(() => {
    setBugs([]);
    setScore(0);
    setLives(MAX_LIVES);
    setGameOver(false);
    difficultyRef.current = 1;
    lastSpawnRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = MAX_LIVES;
    setRunning(true);
  }, []);

  const endGame = useCallback(() => {
    setRunning(false);
    setGameOver(true);
    cancelAnimationFrame(frameRef.current);
    setLeaderboard(getLeaderboard());
  }, []);

  // Game loop
  useEffect(() => {
    if (!running) return;

    let lastTime = 0;

    const loop = (now: number) => {
      if (!runningRef.current) return;
      const dt = now - lastTime;
      lastTime = now;

      // Difficulty ramps up every 10 points
      difficultyRef.current = 1 + Math.floor(scoreRef.current / 10) * 0.3;

      // Spawn bugs
      const spawnInterval = Math.max(600, 1400 - scoreRef.current * 20);
      if (now - lastSpawnRef.current > spawnInterval) {
        lastSpawnRef.current = now;
        const areaW = gameAreaRef.current?.clientWidth ?? 400;
        setBugs((prev) => [
          ...prev,
          {
            id: bugIdRef.current++,
            x: Math.random() * (areaW - 40),
            y: -40,
            speed: (1.5 + Math.random() * 1.5) * difficultyRef.current,
            emoji: BUG_EMOJIS[Math.floor(Math.random() * BUG_EMOJIS.length)],
          },
        ]);
      }

      // Move bugs down
      setBugs((prev) => {
        const areaH = gameAreaRef.current?.clientHeight ?? 400;
        const survived: Bug[] = [];
        let escaped = 0;

        for (const bug of prev) {
          const newY = bug.y + bug.speed * (dt / 16);
          if (newY > areaH) {
            escaped++;
          } else {
            survived.push({ ...bug, y: newY });
          }
        }

        if (escaped > 0) {
          livesRef.current -= escaped;
          setLives(livesRef.current);
          if (livesRef.current <= 0) {
            // End game next tick
            setTimeout(() => endGame(), 0);
            return survived;
          }
        }

        return survived;
      });

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [running, endGame]);

  const squashBug = useCallback((id: number) => {
    setBugs((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => {
      scoreRef.current = s + 1;
      return s + 1;
    });
  }, []);

  const handleGameOver = () => {
    saveScore(score);
    setLeaderboard(getLeaderboard());
  };

  return (
    <section id="minigame" className="py-32 px-6 max-w-7xl mx-auto">
      <SectionHeading label="Minigame" title="Debug Rush 🐛" />
      <p className="text-slate-400 mt-4 mb-10 max-w-xl">
        Bugs are falling! Click them before they escape. How long can you hold the line?
      </p>

      <motion.div
        layout
        className="glass-card overflow-hidden max-w-2xl mx-auto scanline-overlay"
        style={{ fontFamily: '"Courier New", monospace' }}
      >
        {/* Terminal title bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-3 text-xs text-slate-500">debug-rush.exe</span>
          </div>
          <div className="flex items-center gap-2">
            {running && (
              <>
                <span className="text-cyan-400 text-xs">Score: {score}</span>
                <span className="text-red-400 text-xs ml-4">
                  {'❤️'.repeat(lives)}{'🖤'.repeat(MAX_LIVES - lives)}
                </span>
              </>
            )}
            <button
              onClick={() => setMinimized((m) => !m)}
              className="text-slate-400 hover:text-white ml-3"
              aria-label={minimized ? 'Maximize game' : 'Minimize game'}
            >
              {minimized ? <IconMaximize size={14} /> : <IconMinimize size={14} />}
            </button>
          </div>
        </div>

        {/* Game area */}
        <AnimatePresence>
          {!minimized && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                ref={gameAreaRef}
                className="relative bg-black/70 overflow-hidden select-none"
                style={{ height: 400 }}
              >
                {/* Grid background (retro feel) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Start screen */}
                {!running && !gameOver && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <div className="text-6xl">🐛</div>
                    <p className="text-cyan-400 text-lg">Debug Rush</p>
                    <p className="text-slate-500 text-sm text-center px-8">
                      Click the bugs before they reach the bottom!<br/>
                      You have {MAX_LIVES} lives. Good luck!
                    </p>
                    <button
                      onClick={startGame}
                      className="btn-ripple px-6 py-3 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors"
                    >
                      START GAME
                    </button>

                    {/* Leaderboard */}
                    {leaderboard.length > 0 && (
                      <div className="mt-4 w-48">
                        <p className="text-slate-500 text-xs mb-2 text-center">TOP SCORES</p>
                        {leaderboard.map((entry, i) => (
                          <div key={i} className="flex justify-between text-xs py-0.5">
                            <span className="text-slate-400">{i + 1}. {entry.initials}</span>
                            <span className="text-cyan-400">{entry.score}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Game over screen */}
                {gameOver && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60">
                    <div className="text-5xl">💀</div>
                    <p className="text-red-400 text-xl font-bold">GAME OVER</p>
                    <p className="text-white text-lg">Score: <span className="text-cyan-400 font-bold">{score}</span></p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => { handleGameOver(); startGame(); }}
                        className="btn-ripple flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-500 text-black text-sm font-bold hover:bg-cyan-400 transition-colors"
                      >
                        <IconRefresh size={14} /> Play Again
                      </button>
                    </div>

                    {leaderboard.length > 0 && (
                      <div className="mt-2 w-48">
                        <p className="text-slate-500 text-xs mb-2 text-center">TOP SCORES</p>
                        {leaderboard.map((entry, i) => (
                          <div key={i} className="flex justify-between text-xs py-0.5">
                            <span className="text-slate-400">{i + 1}. {entry.initials}</span>
                            <span className="text-cyan-400">{entry.score}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Active bugs */}
                {running && bugs.map((bug) => (
                  <motion.button
                    key={bug.id}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute text-2xl cursor-pointer hover:scale-125 transition-transform active:scale-75"
                    style={{ left: bug.x, top: bug.y, lineHeight: 1 }}
                    onClick={() => squashBug(bug.id)}
                    aria-label={`Squash bug ${bug.id}`}
                  >
                    {bug.emoji}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
