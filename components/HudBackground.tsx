'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const HUD_CYAN = '#00eaff';
const HUD_BG = '#020a14';

const WORLD_MAP_DOTS: Array<[number, number]> = [
  [18, 28],
  [22, 32],
  [26, 30],
  [30, 34],
  [34, 38],
  [38, 42],
  [42, 36],
  [46, 40],
  [50, 44],
  [54, 48],
  [58, 42],
  [62, 46],
  [66, 50],
  [70, 44],
  [74, 48],
  [78, 52],
  [82, 46],
  [20, 52],
  [24, 56],
  [28, 54],
  [32, 58],
  [36, 62],
  [40, 56],
  [44, 60],
  [48, 64],
  [52, 58],
  [56, 62],
  [60, 66],
  [64, 60],
  [68, 64],
  [72, 58],
  [76, 62],
  [24, 22],
  [28, 26],
  [32, 24],
  [36, 28],
  [40, 32],
  [44, 26],
  [48, 30],
  [52, 34],
  [56, 28],
  [60, 32],
  [64, 36],
  [68, 30],
  [72, 34],
  [76, 38],
  [30, 48],
  [34, 52],
  [38, 46],
  [42, 50],
  [46, 54],
  [50, 48],
  [54, 52],
  [58, 46],
  [62, 50],
  [66, 54],
  [70, 48],
  [74, 52],
  [78, 56],
  [26, 40],
  [30, 44],
  [34, 40],
  [38, 44],
  [42, 48],
  [46, 42],
  [50, 46],
  [54, 50],
  [58, 44],
  [62, 48],
  [66, 52],
  [70, 46],
  [74, 50],
  [78, 54],
];

function randomInRange(min: number, max: number, decimals = 0) {
  const value = Math.random() * (max - min) + min;
  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
}

function generateGraphPoints(count = 12) {
  return Array.from({ length: count }, (_, i) => ({
    x: i * (100 / (count - 1)),
    y: 20 + Math.random() * 60,
  }));
}

function generateWaveformBars(count = 16) {
  return Array.from({ length: count }, () => 20 + Math.random() * 80);
}

function pointsToPath(points: Array<{ x: number; y: number }>) {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
}
interface HudBackgroundProps {
  visible?: boolean;
  intensity?: number;
}

export function HudBackground({ visible = true, intensity = 1 }: HudBackgroundProps) {
  const [height, setHeight] = useState('6.8898');
  const [targeting, setTargeting] = useState('7.6898');
  const [tracking, setTracking] = useState('500216441');
  const [climber, setClimber] = useState('6898');
  const [coords, setCoords] = useState('34.0522° N, 118.2437° W');
  const [graphPoints, setGraphPoints] = useState(generateGraphPoints);
  const [waveformBars, setWaveformBars] = useState(generateWaveformBars);
  const [dataStream, setDataStream] = useState(
    () => `SYS::${randomInRange(100000, 999999)} // NODE::${randomInRange(10, 99)}`
  );

  const graphPath = useMemo(() => pointsToPath(graphPoints), [graphPoints]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeight(randomInRange(5, 9, 4));
      setTargeting(randomInRange(6, 10, 4));
      setTracking(randomInRange(100000000, 999999999));
      setClimber(randomInRange(5000, 9999));
      setCoords(`${randomInRange(30, 45, 4)}° N, ${randomInRange(110, 125, 4)}° W`);
      setDataStream(
        `SYS::${randomInRange(100000, 999999)} // NODE::${randomInRange(10, 99)} // LAT::${randomInRange(100, 999)}`
      );
      setGraphPoints(generateGraphPoints());
      setWaveformBars(generateWaveformBars());
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="hud-background"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: intensity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: HUD_BG }} />

          <div className="absolute inset-0">
            {/* Top-left crosshair / targeting panel */}
            <div className="absolute top-[8%] left-[4%] w-48 font-mono text-[10px] tracking-widest text-[#00eaff] uppercase">
              <div className="mb-2 border border-[#00eaff]/50 bg-[#00eaff]/10 px-2 py-1">
                Targeting Computer On
              </div>
              <svg viewBox="0 0 80 80" className="h-20 w-20 text-[#00eaff]">
                <circle
                  cx="40"
                  cy="40"
                  r="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.65"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.8"
                />
                <line x1="40" y1="8" x2="40" y2="72" stroke="currentColor" strokeWidth="0.5" />
                <line x1="8" y1="40" x2="72" y2="40" stroke="currentColor" strokeWidth="0.5" />
                <path
                  d="M24 24 L32 24 L32 32 M48 24 L56 24 L56 32 M24 48 L32 48 L32 56 M48 48 L56 48 L56 56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
              <p className="mt-1">Height {height} FT</p>
              <p>Targeting {targeting} FT</p>
            </div>

            {/* Top-right corner dial */}
            <div className="absolute top-[6%] right-[5%]">
              <svg
                viewBox="0 0 100 100"
                className="hud-dial-slow h-24 w-24 text-[#00eaff]"
                style={{ filter: `drop-shadow(0 0 6px ${HUD_CYAN}40)` }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 15 * Math.PI) / 180;
                  const x1 = 50 + Math.cos(angle) * 30;
                  const y1 = 50 + Math.sin(angle) * 30;
                  const x2 = 50 + Math.cos(angle) * 38;
                  const y2 = 50 + Math.sin(angle) * 38;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeWidth={i % 6 === 0 ? 1.5 : 0.5}
                      opacity={i % 6 === 0 ? 1 : 0.5}
                    />
                  );
                })}
                <circle cx="50" cy="50" r="4" fill="currentColor" />
              </svg>
            </div>

            {/* Bottom-left data panel */}
            <div className="absolute bottom-[12%] left-[4%] w-56 border border-[#00eaff]/40 bg-[#00eaff]/10 p-3 font-mono text-[9px] tracking-wider text-[#00eaff]/80 uppercase">
              <p className="mb-2 text-[10px] text-[#00eaff]">Your Data_ {tracking}</p>
              <p className="mb-1 truncate">{dataStream}</p>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 bg-[#00eaff]/20"
                    style={{ opacity: 0.3 + (i % 3) * 0.2 }}
                  >
                    <div
                      className="h-full bg-[#00eaff]/60"
                      style={{ width: `${30 + ((i * 17) % 60)}%` }}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-2">Tracking Location</p>
              <p className="text-[#00eaff]/65">{coords}</p>
            </div>

            {/* Bottom-center line graph */}
            <div className="absolute bottom-[10%] left-1/2 w-56 -translate-x-1/2 border border-[#00eaff]/40 bg-[#00eaff]/10 p-2">
              <p className="mb-1 font-mono text-[9px] tracking-widest text-[#00eaff] uppercase">
                Climber {climber}
              </p>
              <svg viewBox="0 0 100 80" className="h-16 w-full">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="#00eaff"
                      strokeWidth="0.15"
                      opacity="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="80" fill="url(#grid)" />
                <path
                  d={graphPath}
                  fill="none"
                  stroke={HUD_CYAN}
                  strokeWidth="1"
                  className="hud-graph-line"
                />
                {graphPoints.map((point, i) => (
                  <circle key={i} cx={point.x} cy={point.y} r="1.2" fill={HUD_CYAN} opacity="0.8" />
                ))}
              </svg>
            </div>

            {/* Bottom-right waveform + bar indicator */}
            <div className="absolute right-[4%] bottom-[12%] w-48 border border-[#00eaff]/40 bg-[#00eaff]/10 p-3">
              <p className="mb-2 font-mono text-[9px] tracking-widest text-[#00eaff] uppercase">
                Command Center
              </p>
              <p className="mb-1 font-mono text-[8px] text-[#00eaff]/75">Voice Recognition</p>
              <div className="mb-3 flex h-8 items-end gap-0.5">
                {waveformBars.map((height, i) => (
                  <div
                    key={i}
                    className="hud-wave-bar flex-1 rounded-sm bg-[#00eaff]/80"
                    style={{
                      height: `${height}%`,
                      animationDelay: `${i * 0.08}s`,
                    }}
                  />
                ))}
              </div>
              <p className="font-mono text-[8px] text-[#00eaff]/80">Target Is Locked</p>
              <div className="mt-2 flex gap-0.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="hud-bar-indicator w-1 bg-[#00eaff]/55"
                    style={{
                      height: `${8 + ((i * 7) % 24)}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom-left corner dial */}
            <div className="absolute bottom-[6%] left-[22%]">
              <svg viewBox="0 0 80 80" className="hud-dial-reverse h-16 w-16 text-[#00eaff]/75">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  return (
                    <line
                      key={i}
                      x1={40 + Math.cos(angle) * 20}
                      y1={40 + Math.sin(angle) * 20}
                      x2={40 + Math.cos(angle) * 32}
                      y2={40 + Math.sin(angle) * 32}
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Center radar + world map */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg viewBox="0 0 320 320" className="h-[min(55vw,420px)] w-[min(55vw,420px)]">
                {/* World map dots */}
                {WORLD_MAP_DOTS.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={(x / 100) * 320}
                    cy={(y / 100) * 320}
                    r="1.2"
                    fill={HUD_CYAN}
                    opacity="0.55"
                  />
                ))}

                {/* Concentric rings */}
                {[140, 110, 80, 50].map((r) => (
                  <circle
                    key={r}
                    cx="160"
                    cy="160"
                    r={r}
                    fill="none"
                    stroke={HUD_CYAN}
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                ))}

                {/* Radar sweep */}
                <g className="hud-radar-sweep" style={{ transformOrigin: '160px 160px' }}>
                  <defs>
                    <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={HUD_CYAN} stopOpacity="0" />
                      <stop offset="100%" stopColor={HUD_CYAN} stopOpacity="0.55" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 160 160 L 160 20 A 140 140 0 0 1 258.28 81.72 Z"
                    fill="url(#sweepGrad)"
                  />
                  <line
                    x1="160"
                    y1="160"
                    x2="160"
                    y2="20"
                    stroke={HUD_CYAN}
                    strokeWidth="1"
                    opacity="0.8"
                  />
                </g>

                {/* Center dot */}
                <circle cx="160" cy="160" r="3" fill={HUD_CYAN} opacity="0.9" />

                {/* Cross markers on rings */}
                <line x1="160" y1="20" x2="160" y2="35" stroke={HUD_CYAN} strokeWidth="0.5" />
                <line x1="160" y1="285" x2="160" y2="300" stroke={HUD_CYAN} strokeWidth="0.5" />
                <line x1="20" y1="160" x2="35" y2="160" stroke={HUD_CYAN} strokeWidth="0.5" />
                <line x1="285" y1="160" x2="300" y2="160" stroke={HUD_CYAN} strokeWidth="0.5" />
              </svg>
            </div>

            {/* Decorative corner brackets */}
            <div className="absolute top-4 left-4 h-8 w-8 border-t border-l border-[#00eaff]/60" />
            <div className="absolute top-4 right-4 h-8 w-8 border-t border-r border-[#00eaff]/60" />
            <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-[#00eaff]/60" />
            <div className="absolute right-4 bottom-4 h-8 w-8 border-r border-b border-[#00eaff]/60" />
          </div>

          {/* Darken overlay — no blur so HUD stays sharp */}
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
