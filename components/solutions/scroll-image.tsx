"use client";
import * as React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function ScrollImage({
  titleComponent,
  src,
  alt = "solution",
  compact = false,
  heightClass,
}: {
  titleComponent?: React.ReactNode;
  src: string;
  alt?: string;
  compact?: boolean;
  heightClass?: string;
}) {
  return (
    <div className="h-full">
      <ContainerScroll
        titleComponent={titleComponent ?? null}
        compact={compact}
        heightClass={heightClass}
      >
        <img
          src={src}
          alt={alt}
          height={720}
          width={1400}
          className="h-full w-full mx-auto rounded-2xl object-cover object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
