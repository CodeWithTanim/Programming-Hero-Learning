import { use, type Dispatch, type SetStateAction } from "react";
import type { IPopularProduct } from "../types/product";
import PopularProductCard from "./PopularProductCard";

interface IPopularProductsProps {
    usersPromise: Promise<IPopularProduct[]>;
    cart: IPopularProduct[];
    setCart: Dispatch<SetStateAction<IPopularProduct[]>>;
}

const PopularProducts = ({
    usersPromise,
    cart,
    setCart
}: IPopularProductsProps) => {
    const data = use(usersPromise);
    // console.log(data, "data");



    return (
        <div className="mx-auto my-20 container">
            <h2 className="font-bold text-3xl text-green-500 mb-4">
                Popular Products
            </h2>
            <div className="grid grid-cols-12 gap-4">
                {/* 30% */}
                <div className="col-span-4 rounded-md shadow-2xl p-4 bg-linear-to-r from-[#179800] to-[#FEFEFE]">
                    <h2 className="font-bold text-2xl">30% Discount</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ipsum
                        exercitationem, placeat impedit fugiat explicabo.
                    </p>
                    <button className="bg-white text-[#179800] font-bold py-2 px-4 rounded-md hover:bg-gray-200">
                        Buy Now
                    </button>
                </div>

                {/* 70% */}
                <div className="col-span-8 rounded-md shadow-2xl p-4">
                    <div className="grid grid-cols-3">
                        {data.map((product) => {
                            // console.log(product, "product");
                            return (
                                <PopularProductCard key={product.title} product={product} cart={cart} setCart={setCart}/>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularProducts;
