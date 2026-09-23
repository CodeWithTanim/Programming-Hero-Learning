import { IBook } from "@/types/books.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IListedBookCardProps {
    book: IBook;
}

const ListedBookCard = ({ book }: IListedBookCardProps) => {
    return (
        <div className="mb-5 flex w-full flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">
            {/* Book Image */}
            <div className="flex h-56 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100 sm:h-56 sm:w-56">
                <Image
                    src={book.image}
                    alt={book.bookName}
                    width={180}
                    height={220}
                    className="h-full w-full object-contain p-4"
                />
            </div>

            {/* Book Content */}
            <div className="flex flex-1 flex-col">
                {/* Title & Author */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{book.bookName}</h2>

                    <p className="mt-2 text-sm text-gray-700">
                        By : <span className="font-medium">{book.author}</span>
                    </p>
                </div>

                {/* Metadata */}
                <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm text-gray-500">
                    {/* Tags */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">Tag</span>

                        {book.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-green-50 px-4 py-2 font-medium text-green-600"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Year */}
                    <div className="flex items-center gap-2">
                        <span className="text-xl">⌾</span>
                        <span>
                            Year of Publishing:{" "}
                            <span className="font-medium text-gray-600">
                                {book.yearOfPublishing}
                            </span>
                        </span>
                    </div>
                </div>

                {/* Publisher & Pages */}
                <div className="mt-4 flex flex-wrap items-center gap-7 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">♧</span>
                        <span>Publisher: {book.publisher}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xl">▧</span>
                        <span>Page {book.totalPages}</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-4 h-px w-full bg-gray-200" />

                {/* Bottom Actions */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-50 px-5 py-2 text-sm font-medium text-blue-500">
                        Category: {book.category}
                    </span>

                    <span className="rounded-full bg-orange-50 px-5 py-2 text-sm font-medium text-orange-400">
                        Rating: {book.rating}
                    </span>

                    <Link href={`/books/${book.bookId}`} className="btn rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-700">
                        <button className="rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-700">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ListedBookCard;
