function SkeletonBox({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 ${className}`}
    />
  );
}

function NewsCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-md border border-gray-200 bg-white">
      {/* Image */}
      <SkeletonBox className="aspect-[16/9] w-full rounded-none" />

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <SkeletonBox className="mb-2 h-2.5 w-12" />

        {/* Title */}
        <div className="space-y-1.5">
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-[82%]" />
        </div>

        {/* Description */}
        <div className="mt-3 space-y-1.5">
          <SkeletonBox className="h-2.5 w-full" />
          <SkeletonBox className="h-2.5 w-[92%]" />
          <SkeletonBox className="h-2.5 w-[70%]" />
        </div>

        {/* Date */}
        <SkeletonBox className="mt-4 h-2.5 w-24" />
      </div>
    </article>
  );
}

function CategoryTitleSkeleton() {
  return (
    <div className="mb-4 border-b border-red-500 pb-2">
      <SkeletonBox className="h-4 w-20" />
    </div>
  );
}

export default function Loading() {
  return (
    <main
      className="
        relative
        left-1/2
        w-[calc(100vw-48px)]
        max-w-7xl
        -translate-x-1/2
        px-0
        py-6
      "
    >
      {/* Category Title */}
      <CategoryTitleSkeleton />

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 18 }).map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}