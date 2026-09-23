'use client'
import { BookContext } from '@/context/BookContext';
import { IBook } from '@/types/books.type';
import React, { useContext } from 'react';
import { Bounce, toast } from 'react-toastify';

const ReadButton = ({ book }: { book: IBook }) => {

    const { readBooks, setReadBooks } = useContext(BookContext)

    // const booksProvider = useContext(BookContext)

    const handleReadBook = () => {
        console.log('clicked read button')
        setReadBooks([...readBooks, book])
        toast.success(`You have read ${book.bookName}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    return (
        <div>
            <button onClick={() => handleReadBook()} className="btn btn-primary rounded-xl px-7">
                Read
            </button>
        </div>
    );
};

export default ReadButton;