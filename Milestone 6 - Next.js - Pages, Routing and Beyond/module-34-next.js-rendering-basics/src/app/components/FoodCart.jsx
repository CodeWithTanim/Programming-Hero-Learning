import Image from 'next/image';
import React from 'react';

const FoodCart = ({food}) => {

    const {dish_name, image_link} = food;

    return (
        <div className="card bg-base-100 shadow-sm">
            <figure>
                <Image width={400} height={400} src={image_link} alt='Food Image'/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {dish_name}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;