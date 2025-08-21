"use client";

import { motion } from "framer-motion";
import { Skeleton } from "./Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Hero Section Skeleton */}
        <div className="mb-24">
          <Skeleton className="h-12 w-4/5 mb-6" />
          <Skeleton className="h-6 w-full mb-3" />
          <Skeleton className="h-6 w-3/4 mb-8" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32 rounded-xl" />
            <Skeleton className="h-12 w-24 rounded-xl" />
          </div>
          <Skeleton className="h-32 w-full mt-10 rounded-2xl" />
        </div>

        {/* Projects Section Skeleton */}
        <div className="mb-24">
          <div className="flex justify-between items-center mb-12">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}