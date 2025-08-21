import React from "react";

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export function Skeleton({ className = "", animate = true }: SkeletonProps) {
  return (
    <div
      className={`bg-[var(--surface)]/50 rounded-lg ${animate ? 'animate-pulse' : ''} ${className}`}
      style={{
        background: `linear-gradient(90deg, var(--surface) 25%, var(--surface-hover) 50%, var(--surface) 75%)`,
        backgroundSize: animate ? '200% 100%' : '100% 100%',
        animation: animate ? 'shimmer 1.5s infinite' : 'none'
      }}
    />
  );
}

export function ProjectSkeleton() {
  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row items-center p-6 bg-[var(--surface)]/50 rounded-2xl border border-[var(--border)]">
        <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-6">
          <Skeleton className="w-full max-w-sm h-48 rounded-lg" />
        </div>
        <div className="flex-1 w-full">
          <Skeleton className="h-6 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
}