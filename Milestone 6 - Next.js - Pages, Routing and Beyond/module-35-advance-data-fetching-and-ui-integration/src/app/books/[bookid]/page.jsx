import React from 'react';

export const generateStaticParams = async () => {
    const res = await fetch('http://localhost:5000/books/')
    const books = await res.json();

    return books.map(book => ({ bookid: book.id }))
}


const BookDetailPage = async ({ params }) => {

    // ! ISR
    const { bookid } = await params;
    const res = await fetch(`http://localhost:5000/books/${bookid}`)
    const book = await res.json();

    return (
        <div>
            <h2>Book Details</h2>
            <h3>Title: {book.title}</h3>
            <p>Description: {book.description}</p>
            <p>Author: {book.author}</p>
            <p>Price: {book.price}</p>
        </div>
    );
};

export default BookDetailPage;