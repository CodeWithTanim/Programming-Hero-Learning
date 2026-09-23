'use client'
import { IBook } from '@/types/books.type';
import React, { useState } from 'react';
import { createContext } from 'react';

interface IBookContext {
    readBooks: IBook[];
    setReadBooks: React.Dispatch<React.SetStateAction<IBook[]>>
    wishlist: IBook[];
    setWishlist: React.Dispatch<React.SetStateAction<IBook[]>>
}

export const BookContext = createContext<IBookContext>({
    readBooks: [],
    setReadBooks: () => {},
    wishlist: [],
    setWishlist: () => {},
})

const BooksProvider = ({children}: {children: React.ReactNode}) => {
    const [readBooks, setReadBooks] = useState<IBook[]>([]);
    const [wishlist, setWishlist] = useState<IBook[]>([])

    const sharedData = {
        readBooks,
        setReadBooks,
        wishlist,
        setWishlist
    }

    return <BookContext.Provider value={sharedData}>{children}</BookContext.Provider>
};

export default BooksProvider;