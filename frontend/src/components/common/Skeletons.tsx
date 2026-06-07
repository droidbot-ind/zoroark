import { Skeleton } from "@/components/ui/skeleton";

interface MovieGridSkeletonProps {
  count?: number;
}

export const MovieGridSkeleton: React.FC<MovieGridSkeletonProps> = ({
  count = 12,
}) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="aspect-[2/3] w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    ))}
  </div>
);

export const MovieRowSkeleton: React.FC<MovieGridSkeletonProps> = ({
  count = 8,
}) => (
  <div className="flex gap-3 overflow-hidden">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="w-[150px] flex-shrink-0 space-y-2 sm:w-[180px]">
        <Skeleton className="aspect-[2/3] w-full rounded-lg" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    ))}
  </div>
);

export const DetailPageSkeleton: React.FC = () => (
  <div className="space-y-8">
    <Skeleton className="aspect-[16/9] w-full rounded-xl sm:aspect-[21/9]" />
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr]">
      <Skeleton className="aspect-[2/3] w-full rounded-lg" />
      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  </div>
);
