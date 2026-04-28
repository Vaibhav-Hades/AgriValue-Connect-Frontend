export default function LoadingSkeleton({ className = '' }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="card p-0 overflow-hidden">
      <LoadingSkeleton className="h-48 rounded-none rounded-t-2xl" />
      <div className="p-4 space-y-3">
        <LoadingSkeleton className="h-4 w-3/4" />
        <LoadingSkeleton className="h-3 w-1/2" />
        <LoadingSkeleton className="h-4 w-1/3" />
        <LoadingSkeleton className="h-9 w-full" />
      </div>
    </div>
  );
}
