import { IBook } from '@/types/books.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IBookCardProps {
    book: IBook;
}

const BookCard = ({ book }: IBookCardProps) => {
    return (
        <div
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            {/* Book Image */}
            <div className="relative h-72 overflow-hidden bg-gray-100">
                <Image
                    src={book.image}
                    alt={book.bookName}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Category */}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur">
                    {book.category}
                </span>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-500">
                        {book.yearOfPublishing}
                    </span>

                    <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-gray-900">
                            {book.rating}
                        </span>
                        <span className="text-yellow-500">★</span>
                    </div>
                </div>

                <h3 className="line-clamp-1 text-xl font-bold text-gray-900">
                    {book.bookName}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    by {book.author}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {book.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Bottom Info */}
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                        <p className="text-xs text-gray-400">Pages</p>
                        <p className="text-sm font-semibold text-gray-800">
                            {book.totalPages}
                        </p>
                    </div>

                    <Link href={`/books/${book.bookId}`}>
                        <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookCard;