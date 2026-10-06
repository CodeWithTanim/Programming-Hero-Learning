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

/* =========================
   News Card
========================= */

function NewsCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-md border border-gray-200 bg-white">
      {/* Image */}
      <SkeletonBox className="aspect-video w-full rounded-none" />

      {/* Content */}
      <div className="space-y-2 p-4">
        {/* Category */}
        <SkeletonBox className="h-2.5 w-16" />

        {/* Title */}
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-[85%]" />

        {/* Description */}
        <div className="pt-1">
          <SkeletonBox className="h-3 w-full" />
          <SkeletonBox className="mt-1.5 h-3 w-[92%]" />
          <SkeletonBox className="mt-1.5 h-3 w-[70%]" />
        </div>

        {/* Date */}
        <SkeletonBox className="mt-3 h-2.5 w-24" />
      </div>
    </article>
  );
}

/* =========================
   Section
========================= */

function SectionSkeleton() {
  return (
    <section className="mb-10">
      {/* Section title */}
      <div className="mb-4 border-b border-red-500 pb-2">
        <SkeletonBox className="h-5 w-24" />
      </div>

      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

/* =========================
   Trending
========================= */

function TrendingSkeleton() {
  return (
    <aside>
      {/* Heading */}
      <div className="mb-4 border-b border-red-500 pb-2">
        <SkeletonBox className="h-5 w-28" />
      </div>

      {/* Trending Items */}
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex gap-3 border-b border-gray-100 pb-3"
          >
            {/* Number */}
            <SkeletonBox className="h-6 w-6 shrink-0 rounded-full" />

            {/* Text */}
            <div className="flex-1 space-y-2">
              <SkeletonBox className="h-3 w-full" />
              <SkeletonBox className="h-3 w-[80%]" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* =========================
   Hero
========================= */

function HeroSkeleton() {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Main News */}
        <div className="lg:col-span-2">
          <SkeletonBox className="aspect-video w-full" />

          <div className="mt-4 space-y-3">
            <SkeletonBox className="h-3 w-20" />
            <SkeletonBox className="h-6 w-full" />
            <SkeletonBox className="h-6 w-[85%]" />
            <SkeletonBox className="h-3 w-full" />
            <SkeletonBox className="h-3 w-[90%]" />
            <SkeletonBox className="h-3 w-[65%]" />
          </div>
        </div>

        {/* Side News */}
        <div className="space-y-4 lg:col-span-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-3 border-b border-gray-200 pb-4"
            >
              <SkeletonBox className="h-20 w-28 shrink-0" />

              <div className="flex-1 space-y-2">
                <SkeletonBox className="h-3 w-16" />
                <SkeletonBox className="h-3 w-full" />
                <SkeletonBox className="h-3 w-[80%]" />
              </div>
            </div>
          ))}
        </div>

        {/* Trending */}
        <div className="lg:col-span-1">
          <TrendingSkeleton />
        </div>
      </div>
    </section>
  );
}

/* =========================
   Social Media
========================= */

function SocialSkeleton() {
  return (
    <section className="mb-10">
      {/* Heading */}
      <div className="mb-4 border-b border-red-500 pb-2">
        <SkeletonBox className="h-5 w-28" />
      </div>

      {/* Social Cards */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <SkeletonBox className="aspect-square w-full" />
            <SkeletonBox className="mx-auto h-3 w-20" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================
   Loading Page
========================= */

export default function Loading() {
  return (
    <main className="relative left-1/2 w-screen -translate-x-1/2">
      {/* Actual page width */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Hero + Trending */}
        <HeroSkeleton />

        {/* Category Sections */}
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />

        {/* Social */}
        <SocialSkeleton />

      </div>
    </main>
  );
}