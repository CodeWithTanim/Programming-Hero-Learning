"use client";
import BookCard from "@/components/shared/BookCard";
import ListedBookCard from "@/components/shared/ListedBookCard";
import { BookContext } from "@/context/BookContext";
import { IBook } from "@/types/books.type";
import Image from "next/image";
import React, { useContext, useState } from "react";

const ListedBooks = () => {
    const { readBooks, wishlist } = useContext(BookContext);
    console.log(readBooks, "readBooks Added");
    console.log(wishlist, "wishlist Added");

    const [sortBy, setSortBy] = useState<"rating" | "pages" | "year">("rating");

    const sortBooks = (books: IBook[]) => {
        const sortedBooks = [...books];
        if (sortBy === "rating") {
            sortedBooks.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === "pages") {
            sortedBooks.sort((a, b) => b.totalPages - a.totalPages);
        } else if (sortBy === "year") {
            sortedBooks.sort((a, b) => b.yearOfPublishing - a.yearOfPublishing);
        }
        return sortedBooks;
    };
    const sortedReadBooks = sortBooks(readBooks);
    const sortedWishlist = sortBooks(wishlist);

    return (
        <div className="container mx-auto py-5">
            <h2 className="my-7 bg-amber-100 rounded-3xl py-16 font-bold text-4xl text-center">
                Listed Books
            </h2>

            <div className="text-center">
                <select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(e.target.value as "rating" | "pages" | "year")
                    }

                    className="select select-success"
                >
                    <option disabled={true}>Sort By</option>
                    <option value={"rating"}>Rating</option>
                    <option value={"pages"}>Number of Pages</option>
                    <option value={"year"}>Publisher Year</option>
                </select>
            </div>

            {/* name of each tab group should be unique */}
            <div className="tabs tabs-border">
                <input
                    type="radio"
                    name="my_tabs_2"
                    className="tab"
                    aria-label={`Read Books (${readBooks.length})`}
                    defaultChecked
                />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    {sortedReadBooks.length > 0 ? (
                        sortedReadBooks.map((book: IBook) => {
                            return <ListedBookCard key={book.bookId} book={book} />;
                        })
                    ) : (
                        <p className="text-center text-lg font-semibold text-gray-400">
                            You haven&apos;t read any Books
                        </p>
                    )}
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    className="tab"
                    aria-label={`Wishlist Books (${wishlist.length})`}
                />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    {sortedWishlist.length > 0 ? (
                        sortedWishlist.map((book: IBook) => {
                            return <ListedBookCard key={book.bookId} book={book} />;
                        })
                    ) : (
                        <p className="text-center text-lg font-semibold text-gray-400">
                            You don&apos;t have any wishlist Books
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListedBooks;
