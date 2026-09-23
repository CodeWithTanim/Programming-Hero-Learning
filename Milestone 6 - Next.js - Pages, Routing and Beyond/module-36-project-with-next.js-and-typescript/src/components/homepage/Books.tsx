import React from "react";
import BookCard from "../shared/BookCard";
import { IBook } from "@/types/books.type";

const getBooks = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/booksData.json`,
        );
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching books data", error);
        return [];
    }
};

const Books = async () => {
    const bookData = await getBooks();

    return (
        <section className="container mx-auto my-17.5 px-4">
            <div className="mb-10 text-center">
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                    Explore Our Collection
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Featured Books
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-gray-500">
                    Discover timeless classics and captivating stories worth adding to
                    your bookshelf.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {bookData.slice(0, 6).map((book: IBook, ind: number) => {
                    return <BookCard key={ind} book={book} />
                })}
            </div>
        </section>
    );
};

export default Books;