"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

/* ======================================================
   Utilities , points & smooth path (Catmull-Rom → Bezier)
====================================================== */
type P = { x: number; y: number }

function fermatSpiralPoints(opts: {
  cx: number
  cy: number
  n: number
  radius: number
  jitter?: number
}): P[] {
  const { cx, cy, n, radius, jitter = 0 } = opts
  const golden = Math.PI * (3 - Math.sqrt(5)) // ~2.39996
  const pts: P[] = []
  for (let i = 0; i < n; i++) {
    const r = radius * Math.sqrt(i / (n - 1))
    const theta = i * golden
    let x = cx + r * Math.cos(theta)
    let y = cy + r * Math.sin(theta)
    if (jitter > 0) {
      x += (Math.random() - 0.5) * jitter
      y += (Math.random() - 0.5) * jitter
    }
    pts.push({ x, y })
  }
  return pts
}

// Convert Catmull-Rom spline through points to a SVG cubic Bezier path
function catmullRom2bezier(points: P[], closed = false): string {
  if (points.length < 2) return ""
  const pts = points.slice()
  if (closed) {
    pts.unshift(points[points.length - 1])
    pts.push(points[0], points[1])
  } else {
    // duplicate endpoints for open curve
    pts.unshift(points[0])
    pts.push(points[points.length - 1])
  }

  const d: string[] = []
  d.push(`M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`)
  for (let i = 1; i < pts.length - 2; i++) {
    const p0 = pts[i - 1]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2]

    const tension = 0.5 // 0..1
    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension

    d.push(
      `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ` +
        `${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ` +
        `${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
    )
  }
  return d.join(" ")
}

/* ======================================================
   HeroSection (content unchanged) + QuantumNeuralBackground
====================================================== */
type HeroSectionProps = {
  title: string
  subtitle: string
  primaryButtonText: string
  secondaryButtonText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export function HeroSectionAI({
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden bg-black">
      {/* Subtle grid */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          on ? "opacity-15" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glow */}
      <div
        className={`absolute right-[-8rem] top-1/3 w-[40rem] h-[40rem] rounded-full blur-3xl transition-all duration-1000 ${
          on ? "opacity-70 scale-100" : "opacity-0 scale-95"
        }`}
        style={{
          background:
            "radial-gradient(closest-side, rgba(56,189,248,0.22), rgba(37,99,235,0.14), rgba(0,0,0,0))",
        }}
      />

      <QuantumNeuralBackground on={on} />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="inline-block mb-4 px-4 py-1.5 bg-primary/15 text-primary/90 rounded-full text-sm font-medium ring-1 ring-primary/20">
            {primaryButtonText}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight text-balance">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl leading-relaxed text-pretty">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-base group" onClick={onPrimaryClick}>
              {primaryButtonText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            {secondaryButtonText && (
              <Button size="lg" variant="outline" className="text-base bg-transparent" onClick={onSecondaryClick}>
                {secondaryButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .qn-draw,
          .qn-pulse,
          .qn-float {
            animation-duration: 1ms !important;
            animation-iteration-count: 1 !important;
          }
        }
        .qn-draw {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: qn-draw-key 1.8s ease-in-out forwards;
        }
        @keyframes qn-draw-key {
          to {
            stroke-dashoffset: 0;
          }
        }
        .qn-pulse {
          animation: qn-pulse-key 2.8s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes qn-pulse-key {
          0%,
          100% {
            r: 3.4;
            opacity: 1;
          }
          50% {
            r: 4.8;
            opacity: 0.75;
          }
        }
        .qn-float {
          animation: qn-float-key 18s linear infinite;
          transform-origin: 50% 50%;
        }
        @keyframes qn-float-key {
          0% {
            transform: translate(0px, 0px);
          }
          25% {
            transform: translate(6px, -8px);
          }
          50% {
            transform: translate(0px, 0px);
          }
          75% {
            transform: translate(-5px, 6px);
          }
          100% {
            transform: translate(0px, 0px);
          }
        }
      `}</style>
    </section>
  )
}

/* ======================================================
   QuantumNeuralBackground
   - Deterministic "quantum-like" pattern
   - Fermat spiral points (regular, aesthetic)
   - Multiple continuous strands via Catmull-Rom → Bezier
   - Glowing nodes on selected anchors
====================================================== */
function QuantumNeuralBackground({ on }: { on: boolean }) {
  // Canvas / layout
  const vb = { w: 1200, h: 800 }
  const cx = vb.w / 2
  const cy = vb.h / 2

  // Generate points once (deterministic)
  const { points, nodeIdxSets, strandSets } = useMemo(() => {
    // Main cloud
    const pts = fermatSpiralPoints({
      cx,
      cy,
      n: 80,
      radius: 280,
      jitter: 0, // set 6~10 for organic randomness
    })

    // Choose node indices for glow nodes (regularly spaced)
    const nodeIdx = [4, 10, 16, 22, 28, 34, 40, 46, 52, 60, 68, 76]

    // Build 5 continuous strands by walking every k-th point, offset by phase
    const strands: P[][] = []
    const bundleCount = 5
    const steps = [2, 3, 5, 7, 9] // co-prime-ish steps for nice weaving
    for (let b = 0; b < bundleCount; b++) {
      const k = steps[b]
      const phase = b * 2
      const seq: P[] = []
      for (let i = phase; i < pts.length; i += k) seq.push(pts[i])
      strands.push(seq)
    }

    return {
      points: pts,
      nodeIdxSets: nodeIdx,
      strandSets: strands,
    }
  }, [cx, cy])

  // Convert strands to smooth path strings
  const paths = useMemo(() => {
    return strandSets.map((seq) => catmullRom2bezier(seq, false)).filter(Boolean)
  }, [strandSets])

  // Colors
  const strokeA = "url(#qnb-blue)" // neon blue → cyan
  const strokeB = "url(#qnb-cyan)" // cyan → purple

  return (
    <svg
      className={`absolute inset-0 w-[140%] h-[140%] -left-[20%] -top-[20%] pointer-events-none ${
        on ? "opacity-100 qn-float" : "opacity-0"
      } transition-opacity duration-700`}
      viewBox={`0 0 ${vb.w} ${vb.h}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="qnb-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.0" />
          <stop offset="45%" stopColor="#60A5FA" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="qnb-cyan" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.95" />
        </linearGradient>
        <filter id="qnb-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Continuous strands (alternating gradients) */}
      {paths.map((d, i) => (
        <path
          key={`strand-${i}`}
          d={d}
          stroke={i % 2 === 0 ? strokeA : strokeB}
          strokeWidth={i === 2 ? 2 : 1.6}
          fill="none"
          className={on ? "qn-draw" : ""}
          style={{ animationDelay: `${0.2 + i * 0.18}s` }}
          filter="url(#qnb-glow)"
          opacity={0.9}
        />
      ))}

      {/* Glowing nodes at selected anchors */}
      {nodeIdxSets.map((idx, i) => {
        const p = points[idx]
        return (
          <g key={`node-${i}`} filter="url(#qnb-glow)">
            <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="#67e8f9" strokeOpacity="0.35" />
            <circle
              cx={p.x}
              cy={p.y}
              r={3.4}
              fill="#60a5fa"
              className={on ? "qn-pulse" : ""}
              style={{ animationDelay: `${0.6 + (i % 6) * 0.15}s` }}
            />
          </g>
        )
      })}
    </svg>
  )
}
