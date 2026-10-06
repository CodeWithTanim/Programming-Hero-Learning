
import React from 'react';
import { notFound } from 'next/navigation';

interface ArticleBody {
    type: 'text' | 'image' | 'subheading';
    text?: string;
    url?: string;
    width?: number;
    height?: number;
    caption?: string;
    altText?: string;
    copyrightHolder?: string;
}

interface News {
    id: string;
    title: string;
    description: {
        blocks?: {
            model?: {
                blocks?: {
                    model?: {
                        text?: string;
                    };
                }[];
            };
        }[];
    };
    link: string;
    firstPublished: string;
    lastPublished: string;
    byline: {
        name: string;
        role: string;
    }[];
    topics: {
        id: string;
        name: string;
    }[];
    tags: string[];
    imageUrl: string;
    body: ArticleBody[];
    text: string;
    wordCount: number;
    source: string;
    sourceUrl: string;
}

interface Props {
    params: Promise<{
        articleId: string;
    }>;
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Dhaka',
    });
};

const NewsDetailsPage = async ({ params }: Props) => {
    const { articleId } = await params;

    let data;

    try {
        const res = await fetch(
            `https://news-api-v2.vercel.app/api/article/${articleId}`
        );

        // API response unsuccessful
        if (!res.ok) {
            notFound();
        }

        data = await res.json();

    } catch (error) {
        // Do not hide Next.js notFound() error
        if (
            error &&
            typeof error === 'object' &&
            'digest' in error &&
            typeof error.digest === 'string' &&
            error.digest.startsWith('NEXT_HTTP_ERROR_FALLBACK;404')
        ) {
            throw error;
        }

        notFound();
    }

    const news: News | null = data?.data;

    // News does not exist
    if (!news || !news.id) {
        notFound();
    }

    const description = news.description?.blocks
        ?.flatMap(block => block.model?.blocks ?? [])
        .map(block => block.model?.text ?? '')
        .join(' ')
        .trim();

    return (
        <main className="max-w-[680px] mx-auto px-4 py-5">

            {/* News Title */}
            <h1 className="text-2xl font-bold leading-snug text-gray-900">
                {news.title}
            </h1>

            {/* Description */}
            {description && (
                <p className="text-sm text-gray-500 leading-relaxed mt-2">
                    {description}
                </p>
            )}

            {/* Published Information */}
            <div className="border-y border-gray-200 py-3 mt-3 mb-4">

                <p className="text-xs text-gray-500">
                    {formatDate(news.firstPublished)}
                </p>

                {news.byline?.map((author, index) => (
                    <p
                        key={index}
                        className="text-xs text-gray-500 mt-1"
                    >
                        {author.name}
                        {author.role ? `, ${author.role}` : ''}
                    </p>
                ))}

            </div>

            {/* News Content */}
            <article className="text-gray-800">

                {news.body?.map((item, index) => {

                    if (item.type === 'image') {
                        return (
                            <figure key={index} className="my-5">

                                <img
                                    src={item.url}
                                    alt={item.altText || news.title}
                                    width={item.width}
                                    height={item.height}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    className="w-full h-auto rounded-md"
                                />

                                {(item.caption || item.copyrightHolder) && (
                                    <figcaption className="text-xs text-gray-500 mt-2 leading-relaxed">

                                        {item.caption}

                                        {item.copyrightHolder && (
                                            <span className="text-gray-400">
                                                {' '}({item.copyrightHolder})
                                            </span>
                                        )}

                                    </figcaption>
                                )}

                            </figure>
                        );
                    }

                    if (item.type === 'subheading') {
                        return (
                            <h2
                                key={index}
                                className="text-lg font-bold text-gray-900 mt-7 mb-3"
                            >
                                {item.text}
                            </h2>
                        );
                    }

                    if (item.type === 'text') {
                        return (
                            <p
                                key={index}
                                className="text-[15px] leading-[1.9] mb-4 text-gray-800"
                            >
                                {item.text}
                            </p>
                        );
                    }

                    return null;
                })}

            </article>

            {/* Tags */}
            {news.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 mb-6">

                    {news.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}

                </div>
            )}

        </main>
    );
};

export default NewsDetailsPage;
