'use client'
import { BookContext } from '@/context/BookContext';
import { IBook } from '@/types/books.type';
import React, { useContext } from 'react';
import { Bounce, toast } from 'react-toastify';

const WishlistButton = ({ book }: { book: IBook }) => {

    const { wishlist, setWishlist } = useContext(BookContext)

    // const booksProvider = useContext(BookContext)

    const handleAddToWishList = () => {
        console.log('clicked read button')
        setWishlist([...wishlist, book])
        toast.info(`You have wishlisted ${book.bookName}`, {
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
            <button onClick={() => handleAddToWishList()} className="btn btn-primary rounded-xl px-7">
                Wishlist
            </button>
        </div>
    );
};

export default WishlistButton;