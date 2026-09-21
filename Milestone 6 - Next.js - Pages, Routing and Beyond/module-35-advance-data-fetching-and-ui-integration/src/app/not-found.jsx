'use client'; // Required for window.history.back()

import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-[80vh] flex items-center justify-center px-6 py-24">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Glowing 404 Badge */}
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-sm">
                    <span className="text-sm font-semibold tracking-wider uppercase">Error 404</span>
                </div>

                {/* Main Heading & Description */}
                <div className="space-y-3">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
                        Page not found
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg">
                        Sorry, we couldn’t find the page you’re looking for. It might have been moved or doesn’t exist.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border"
                    >
                        {/* Inline ArrowLeft SVG */}
                        <svg xmlns="http://w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                        Go back
                    </button>

                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-shadow shadow-md hover:shadow-lg"
                    >
                        {/* Inline Home SVG */}
                        <svg xmlns="http://w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
