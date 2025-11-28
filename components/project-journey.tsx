"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Dir = "ltr" | "rtl"

export type JourneyStep = {
  percent: number // 0..100
  title: string
  description?: string
  icon?: React.ReactNode
}

type ProjectJourneyProps = {
  title?: string
  subtitle?: string
  steps: JourneyStep[]
  target?: number
  autoplay?: boolean
  durationMs?: number
  fillDelayMs?: number
  dir?: Dir
  className?: string
  progressStrokeClass?: string
  trackStrokeClass?: string
  markerClass?: string
}

export default function ProjectJourney({
  title = "From Discovery to Delivery",
  subtitle = "From concept exploration to final deployment, we manage every step of your digital journey to ensure seamless execution, measurable impact, and long-term success.",
  steps,
  target = 100,
  autoplay = true,
  durationMs = 1600,
  fillDelayMs = 100,
  dir = "ltr",
  className,
  progressStrokeClass = "stroke-[4] stroke-primary",
  trackStrokeClass = "stroke-muted",
  markerClass = "bg-primary shadow-md",
}: ProjectJourneyProps) {
  const pathRef = React.useRef<SVGPathElement | null>(null)
  const hostRef = React.useRef<HTMLElement | null>(null)

  const [totalLen, setTotalLen] = React.useState(0)
  const [inView, setInView] = React.useState(false)
  const [progress, setProgress] = React.useState(0) // 0..100
  const [isMobile, setIsMobile] = React.useState(false)

  const safeSteps = React.useMemo(
    () => steps.filter((s) => typeof s.percent === "number" && s.percent >= 0 && s.percent <= 100)
      .sort((a,b)=>a.percent-b.percent),
    [steps]
  )

  // detect mobile with matchMedia (works in client)
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)") // md breakpoint
    const handler = () => setIsMobile(mq.matches)
    handler()
    mq.addEventListener?.("change", handler)
    return () => mq.removeEventListener?.("change", handler)
  }, [])

  // compute svg path length only when needed (desktop)
  React.useLayoutEffect(() => {
    if (!pathRef.current) return
    try {
      const len = pathRef.current.getTotalLength()
      setTotalLen(len)
    } catch {
      setTotalLen(0)
    }
  }, [isMobile, steps])

  // intersection observer to start animation once in view (both modes)
  React.useEffect(() => {
    if (!autoplay || !hostRef.current) return
    const el = hostRef.current
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [autoplay])

  // animate progress (same driver for both modes)
  React.useEffect(() => {
    if (!autoplay || !inView) return
    const dest = Math.max(0, Math.min(100, target))
    let rafId = 0
    let toId: ReturnType<typeof setTimeout> | null = null

    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / Math.max(1, durationMs))
        const eased = 1 - Math.pow(1 - p, 3)
        setProgress(dest * eased)
        if (p < 1) rafId = requestAnimationFrame(tick)
      }
      rafId = requestAnimationFrame(tick)
    }

    toId = setTimeout(run, Math.max(0, fillDelayMs))
    return () => {
      if (toId) clearTimeout(toId)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [autoplay, inView, target, durationMs, fillDelayMs])

  // desktop helper: get point on path by percent (safe guard if path missing)
  const getPointAt = React.useCallback((pct: number) => {
    if (!pathRef.current || !totalLen) return { x: 0, y: 0 }
    const len = (Math.max(0, Math.min(100, pct)) / 100) * totalLen
    const p = pathRef.current.getPointAtLength(len)
    return { x: p.x, y: p.y }
  }, [totalLen])

  // desktop: build milestone locations (if available)
  const milestonePoints = React.useMemo(() => {
    if (isMobile || !pathRef.current || !totalLen) return []
    return safeSteps.map((s) => {
      const pt = getPointAt(s.percent)
      return { ...s, x: pt.x, y: pt.y }
    })
  }, [isMobile, safeSteps, totalLen, getPointAt])

  const progressLen = (Math.max(0, Math.min(100, progress)) / 100) * totalLen

  return (
    <section
      dir={dir}
      ref={hostRef}
      className={cn("w-full py-10 md:py-16", className)}
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-easing="ease-out-cubic"
      data-aos-once="true"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={cn("mb-6 md:mb-10", dir === "rtl" ? "text-right" : "text-left")}>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center">{title}</h2>
          {subtitle && <p className="mt-2 text-sm md:text-base text-inherit/90 text-center">{subtitle}</p>}
        </div>

        {/* ========== MOBILE: vertical timeline ========== */}
        {isMobile ? (
          <div className={cn("relative flex flex-col gap-6")}>
            {/* left-side vertical line (or right if rtl) */}
            <div className="absolute inset-y-0 left-6 md:left-8">
              <div className="w-[2px] h-full bg-slate-200 dark:bg-slate-700 rounded" />
              {/* progress overlay */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "2px",
                  height: `${Math.max(0, Math.min(100, progress))}%`,
                }}
                className={cn("rounded", progressStrokeClass, "origin-top")}
              />
            </div>

            {/* steps stacked */}
            {safeSteps.map((s, i) => {
              const hit = s.percent <= progress
              return (
                <div key={`${s.title}-${i}`} className="flex items-start gap-4 pl-14 pr-4">
                  <div className="relative -ml-10 w-8 flex-none">
                    <div
                      className={cn(
                        "h-6 w-6 rounded-full border flex items-center justify-center",
                        hit ? "border-primary bg-primary/20" : "border-border bg-background"
                      )}
                    >
                      <span className={cn("h-2.5 w-2.5 rounded-full", hit ? "bg-primary" : "bg-muted-foreground/40")} />
                    </div>
                  </div>

                  <div className={cn("flex-1")}>
                    <div className={cn("rounded-xl border bg-popover/95 text-popover-foreground shadow-sm p-3")}>
                      <div className="flex items-start gap-2">
                        {s.icon && <span className="mt-0.5 shrink-0 text-primary">{s.icon}</span>}
                        <div>
                          <div className={cn("text-sm font-semibold", hit ? "text-primary" : "text-muted-foreground")}>
                            {s.percent}% • {s.title}
                          </div>
                          {s.description && <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.description}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className="font-medium">{Math.round(progress)}% complete</span>
              <span>100%</span>
            </div>
          </div>
        ) : (
          /* ========== DESKTOP: curved path with marker and popovers ========== */
          <div className="relative">
            <svg className="w-full" viewBox="0 0 1200 320" fill="none">
              <path
                d="M 40 270 C 220 120, 460 120, 620 190 S 980 300, 1160 60"
                ref={pathRef}
                className={cn("stroke-[6] md:stroke-[8]", trackStrokeClass)}
                strokeOpacity={0.28}
                strokeLinecap="round"
                fill="none"
              />
              {totalLen > 0 && (
                <path
                  d="M 40 270 C 220 120, 460 120, 620 190 S 980 300, 1160 60"
                  className={cn("stroke-[6] md:stroke-[8] transition-all", progressStrokeClass)}
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: `${progressLen} ${Math.max(0, totalLen - progressLen)}`,
                    transition: "stroke-dasharray 300ms linear",
                    willChange: "stroke-dasharray",
                  }}
                />
              )}
            </svg>

            {/* marker */}
            {totalLen > 0 && (
              (() => {
                const p = getPointAt(progress)
                return (
                  <div
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2",
                      "h-7 w-7 rounded-full border border-white/30",
                      markerClass
                    )}
                    style={{
                      left: `${p.x}px`,
                      top: `${p.y}px`,
                      boxShadow: "0 8px 20px rgba(0,0,0,.15)",
                    }}
                  >
                    <span className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-sm opacity-50 pointer-events-none">
                      <svg width="60" height="60" viewBox="0 0 60 60">
                        <defs>
                          <linearGradient id="gDesktop" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M30 30 L5 40" stroke="url(#gDesktop)" strokeWidth="6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </div>
                )
              })()
            )}

            {/* milestones positioned along path */}
            {milestonePoints.map((m, i) => {
              const hit = m.percent <= progress
              return (
                <div key={`${m.title}-${i}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${m.x}px`, top: `${m.y}px` }}>
                  <div className={cn("h-5 w-5 md:h-6 md:w-6 rounded-full border flex items-center justify-center", hit ? "border-primary bg-primary/20" : "border-border bg-background")}>
                    <span className={cn("h-2.5 w-2.5 rounded-full", hit ? "bg-primary" : "bg-muted-foreground/40")} />
                  </div>

                  <div className={cn("mt-3 pointer-events-auto", dir === "rtl" ? "text-right" : "text-left")}>
                    <div className={cn("w-[220px] md:w-[260px] rounded-xl border bg-popover/95 text-popover-foreground shadow-md p-3", hit ? "ring-1 ring-primary/20" : "", "transition-transform duration-200")}>
                      <div className="flex items-start gap-2">
                        {m.icon && <span className="mt-0.5 shrink-0 text-primary">{m.icon}</span>}
                        <div>
                          <div className={cn("text-xs font-semibold uppercase tracking-wider", hit ? "text-primary" : "text-muted-foreground")}>
                            {m.percent}% • {m.title}
                          </div>
                          {m.description && <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.description}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className="font-medium">{Math.round(progress)}% complete</span>
              <span>100%</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
