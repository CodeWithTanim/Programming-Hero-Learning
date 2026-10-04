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

const MainNews = ({ news }: { news: News[] }) => {
    const [firstNews, ...otherNews] = news;

    if (!firstNews) return null;

    return (
        <div className="max-w-[810px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Featured News */}
            <Link href={`/article/${firstNews.id}`}>
                <div className="bg-base-100 border border-gray-200 rounded-lg overflow-hidden h-[436px]">
                    {/* Featured Image */}
                    <figure className="relative w-full h-[228px]">
                        <Image
                            src={firstNews.imageUrl}
                            alt={firstNews.imageAlt}
                            fill
                            className="object-cover"
                        />
                    </figure>

                    {/* Featured News Content */}
                    <div className="p-4">
                        {/* Category */}
                        <p className="text-red-600 text-xs mb-1">{firstNews.category}</p>

                        {/* Title */}
                        <h2 className="text-xl font-bold leading-snug">
                            {firstNews.title}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-500 text-sm leading-relaxed mt-2 line-clamp-3">
                            {firstNews.description}
                        </p>

                        {/* Published Date */}
                        <p className="text-xs text-gray-400 mt-3">
                            {formatDate(firstNews.firstPublished)}
                        </p>
                    </div>
                </div>
            </Link>

            {/* Other Headlines */}
            <div className="bg-base-100 border border-gray-200 rounded-lg overflow-hidden h-[436px]">
                {otherNews.slice(0, 4).map((item, index) => (
                    <Link
                        key={item.id}
                        href={`/article/${item.id}`}
                        className={`block p-3 ${index !== 3 ? "border-b border-gray-200" : ""
                            }`}
                    >
                        {/* Category */}
                        <p className="text-red-600 text-xs mb-1">{item.category}</p>

                        {/* Title */}
                        <h3 className="text-base leading-snug">{item.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainNews;
