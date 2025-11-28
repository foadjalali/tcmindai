// components/ui/container-scroll-animation.tsx
"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
  compact = false,
  heightClass = "h-[48rem] md:h-[64rem]", // ← جدید: قابل‌اورراید
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  compact?: boolean;
  heightClass?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "start 20%"],
  });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.98, 1] : [1.04, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-14, 0]);
  const translateY = useTransform(scrollYProgress, [0, 1], [-24, 0]);

  return (
    <div
      ref={containerRef}
      className={`${heightClass} flex items-center justify-center relative p-2 md:p-16`}
      style={{ perspective: "1000px" }}
    >
      <Card rotate={rotate} translate={translateY} scale={scale}>
        {children}
      </Card>
    </div>
  );
};

export const Card = ({
  rotate,
  translate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ rotateX: -14, y: -24, scale: 1.04 }}
      style={{
        rotateX: rotate,
        translateY: translate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl mx-auto h-[38rem] md:h-[45rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
