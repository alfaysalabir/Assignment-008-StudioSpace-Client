export function StudioCardSkeleton() {
  return (
    <div className="card h-full animate-pulse overflow-hidden">
      <div className="h-56 bg-line" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-line" />
        <div className="h-4 w-1/2 rounded bg-line" />
        <div className="h-10 w-full rounded-full bg-line" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <StudioCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card h-32 animate-pulse bg-line/50" />
      ))}
    </div>
  );
}
