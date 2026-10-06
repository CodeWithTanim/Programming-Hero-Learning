import Image from "next/image";
import Link from "next/link";
import React from "react";

interface News {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
    firstPublished: string;
}

// Bengali Date & Time Formatter
const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return date;
    }

    return parsedDate.toLocaleString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Dhaka",
    });
};

const NewsCard = ({ news }: { news: News }) => {
    // console.log(news, 'News Card News')

    return (
        <Link href={`/article/${news.id}`}>
            <div>
                <div className="bg-base-100 border border-gray-200 rounded-lg overflow-hidden h-[436px]">
                    {/* Featured Image */}
                    <figure className="relative w-full h-[228px]">
                        <Image
                            src={news.imageUrl}
                            alt={news.imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                        />
                    </figure>

                    {/* Featured News Content */}
                    <div className="p-4">
                        {/* Category */}
                        <p className="text-red-600 text-xs mb-1">{news.category}</p>

                        {/* Title */}
                        <h2 className="text-xl font-bold leading-snug">{news.title}</h2>

                        {/* Description */}
                        <p className="text-gray-500 text-sm leading-relaxed mt-2 line-clamp-3">
                            {news.description}
                        </p>

                        {/* Published Date */}
                        <p className="text-xs text-gray-400 mt-3">
                            {formatDate(news.firstPublished)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NewsCard;
