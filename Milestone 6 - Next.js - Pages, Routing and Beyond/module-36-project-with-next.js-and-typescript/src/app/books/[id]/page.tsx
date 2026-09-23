import ReadButton from "@/components/bookDetails/ReadButton";
import WishlistButton from "@/components/bookDetails/WishlistButton";
import { IBook } from "@/types/books.type";
import Image from "next/image";
import React from "react";

interface IBooksDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

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

const BookDetailsPage = async ({ params }: IBooksDetailsPageProps) => {
  const { id } = await params;
  const booksData = await getBooks();
  // const book = booksData.find((book: IBook) => book.bookId === Number(id))
  const book = booksData.find(
    (book: IBook) => String(book.bookId) === id,
  ) as IBook;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="card lg:card-side overflow-hidden border border-base-200 bg-base-100 shadow-xl">
        {/* Book Cover */}
        <figure className="bg-base-200 p-8 lg:w-2/5">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <Image
              src={book.image}
              alt={book.bookName}
              width={500}
              height={700}
              className="h-auto w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
        </figure>

        {/* Book Details */}
        <div className="card-body justify-center p-6 sm:p-8 lg:w-3/5 lg:p-12">
          {/* Category */}
          <div className="mb-3">
            <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-base-content/60">
              {book.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight text-base-content sm:text-4xl">
            {book.bookName}
          </h1>

          {/* Author */}
          <p className="mt-2 text-base text-base-content/60">
            Written by{" "}
            <span className="font-semibold text-base-content">
              {book.author}
            </span>
          </p>

          {/* Rating */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-xl text-warning">★</span>
              <span className="font-bold">{book.rating}</span>
            </div>

            <span className="text-sm text-base-content/50">
              Based on book rating
            </span>
          </div>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-sm leading-7 text-base-content/70 sm:text-base">
            {book.review}
          </p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-base-300 px-3 py-1.5 text-xs font-medium text-base-content/70"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Book Information */}
          <div className="mt-7 grid grid-cols-2 gap-4 border-y border-base-200 py-5 sm:grid-cols-4">
            <div>
              <p className="text-xs text-base-content/50">Pages</p>
              <p className="mt-1 font-semibold">{book.totalPages}</p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">Published</p>
              <p className="mt-1 font-semibold">{book.yearOfPublishing}</p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">Publisher</p>
              <p className="mt-1 font-semibold">{book.publisher}</p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">Category</p>
              <p className="mt-1 font-semibold">{book.category}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="card-actions mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ReadButton book={book} />

            <WishlistButton book={book} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
