import Link from "next/link";
import React from "react";

interface IMostReadNews {
    id: string;
    title: string;
}

const MostRead = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
    const data = await res.json();

    const news: IMostReadNews[] = data.data;

    return (
        <div className="card p-2 bg-base-100 border border-gray-300">
            <h1 className="font-bold text-red-700 mb-5">সর্বাধিক পঠিত</h1>

            <div className="grid gap-3">
                {news.map((n, i) => (
                    <Link href={`/article/${n.id}`} key={n.id} className="flex gap-2">
                        <p className="text-red-600 text-2xl font-bold">{i + 1}</p>
                        <h2>{n.title}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MostRead;
