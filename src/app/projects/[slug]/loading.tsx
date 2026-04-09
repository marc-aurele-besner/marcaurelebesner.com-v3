import GlassCard from "@/components/GlassCard";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="h-6 w-32 animate-pulse bg-slate-200 dark:bg-slate-700 rounded mb-8" />

      <GlassCard className="p-8 lg:p-12">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="h-10 w-64 animate-pulse bg-slate-200 dark:bg-slate-700 rounded mb-2" />
              <div className="h-6 w-24 animate-pulse bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-5 w-20 animate-pulse bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-5 w-16 animate-pulse bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50 mb-8">
            <div className="w-full h-[400px] animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg" />
          </div>
        </header>

        <div className="space-y-4">
          <div className="h-6 w-full animate-pulse bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-6 w-5/6 animate-pulse bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-6 w-4/5 animate-pulse bg-slate-200 dark:bg-slate-700 rounded" />

          <div className="h-8 w-32 animate-pulse bg-slate-200 dark:bg-slate-700 rounded mt-8 mb-4" />

          <div className="space-y-3">
            <div className="h-5 w-full animate-pulse bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-5 w-11/12 animate-pulse bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-5 w-10/12 animate-pulse bg-slate-200 dark:bg-slate-700 rounded" />
          </div>

          <div className="h-8 w-32 animate-pulse bg-slate-200 dark:bg-slate-700 rounded mt-8 mb-4" />

          <div className="flex flex-wrap gap-2">
            <div className="h-7 w-20 animate-pulse bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-7 w-16 animate-pulse bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-7 w-24 animate-pulse bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
        </div>
      </GlassCard>

      <div className="flex justify-between mt-8 gap-4">
        <GlassCard className="flex-1 p-4">
          <div className="h-4 w-20 animate-pulse bg-slate-200 dark:bg-slate-700 rounded mb-2" />
          <div className="h-5 w-32 animate-pulse bg-slate-200 dark:bg-slate-700 rounded" />
        </GlassCard>
        <GlassCard className="flex-1 p-4">
          <div className="h-4 w-16 animate-pulse bg-slate-200 dark:bg-slate-700 rounded mb-2 ml-auto" />
          <div className="h-5 w-28 animate-pulse bg-slate-200 dark:bg-slate-700 rounded ml-auto" />
        </GlassCard>
      </div>
    </div>
  );
}
