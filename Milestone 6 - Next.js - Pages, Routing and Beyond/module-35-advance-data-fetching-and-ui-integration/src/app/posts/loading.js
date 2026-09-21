export default function Loading() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="space-y-3">
                <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg w-1/3" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded-md w-1/2" />
            </div>

            {/* Grid of Post Cards Skeletons */}
            <div className="grid gap-6 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="p-5 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-4 bg-zinc-50/50 dark:bg-zinc-900/50"
                    >
                        {/* Thumbnail Placeholder */}
                        <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-700 rounded-xl" />

                        {/* Title Placeholder */}
                        <div className="space-y-2">
                            <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded-md w-5/6" />
                            <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded-md w-1/2" />
                        </div>

                        {/* Excerpt Placeholder */}
                        <div className="space-y-2 pt-2">
                            <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-md w-full" />
                            <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-md w-full" />
                            <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-md w-4/5" />
                        </div>

                        {/* Footer Placeholder */}
                        <div className="flex items-center space-x-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                            <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-md w-24" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
