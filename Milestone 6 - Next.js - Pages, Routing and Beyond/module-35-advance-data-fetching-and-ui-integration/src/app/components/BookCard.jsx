'use client'
import Link from 'next/link';
import React, { use } from 'react';
import { UserContext } from '../contexts/UserContext';

const BookCard = ({ book }) => {
    const { id, title, description, price } = book;

    const user = use(UserContext)
    // console.log('context in BookCard', user)

    return (
        <div className="card bg-base-100  shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">$ {price}</button>
                    <Link href={`/books/${id}`}>
                        <button className="btn btn-primary">View</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookCard;