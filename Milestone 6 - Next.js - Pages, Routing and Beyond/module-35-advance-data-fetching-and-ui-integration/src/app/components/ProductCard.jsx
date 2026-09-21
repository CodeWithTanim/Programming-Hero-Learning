'use client'
import React from 'react';
import useUser from '../hooks/useUser';

const ProductCard = ({ product }) => {

    const { id, name, description, price } = product;

    const user = useUser();
    console.log('user from context', user)

    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;