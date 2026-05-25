export default function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 rounded-2xl ${className}`}></div>
  );
}

export function AnimalCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-soft overflow-hidden border border-pink-100 flex flex-col h-full">
      {/* Image Skeleton */}
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      
      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow space-y-4 bg-gradient-to-b from-white to-pink-50/20">
        <Skeleton className="h-7 w-3/4 rounded-xl" />
        
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-1 border-b border-pink-50">
            <Skeleton className="h-3 w-12 rounded-full" />
            <Skeleton className="h-3 w-16 rounded-full" />
          </div>
          <div className="flex justify-between items-center pb-1 border-b border-pink-50">
            <Skeleton className="h-3 w-12 rounded-full" />
            <Skeleton className="h-3 w-20 rounded-full" />
          </div>
          <div className="flex justify-between items-center pb-1 border-b border-pink-50">
            <Skeleton className="h-3 w-12 rounded-full" />
            <Skeleton className="h-3 w-14 rounded-full" />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="h-3 w-24 rounded-full" />
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-pink-100 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-2 w-8 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-lg" />
            </div>
            <Skeleton className="h-4 w-20 rounded-full" />
          </div>
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function AnimalDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-6">
          <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-3xl border border-pink-100">
            <Skeleton className="h-7 w-48 rounded-xl mb-4" />
            <Skeleton className="h-4 w-full rounded-full mb-2" />
            <Skeleton className="h-4 w-full rounded-full mb-2" />
            <Skeleton className="h-4 w-3/4 rounded-full" />
          </div>
        </div>
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-5 w-32 rounded-full" />
            <Skeleton className="h-12 w-3/4 rounded-xl" />
            <Skeleton className="h-7 w-48 rounded-xl" />
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-3xl space-y-6 border border-pink-100">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-24 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
            </div>
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}