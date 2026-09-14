import { type Dispatch, type SetStateAction } from "react";
import type { IPopularProduct } from "../types/product";
import { Bounce, toast } from "react-toastify";

interface IPopularProductCardProps {
    product: IPopularProduct;
    cart: IPopularProduct[];
    setCart: Dispatch<SetStateAction<IPopularProduct[]>>;
}

const PopularProductCard = ({
    product,
    cart,
    setCart,
}: IPopularProductCardProps) => {
    const handleAddToCart = (product: IPopularProduct) => {
        console.log("Clicked add to cart", product);
        setCart([...cart, product]);
        toast.success(`${product.title} added to Cart`, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    return (
        <div key={product.title} className="bg-white p-4 rounded-md shadow-md">
            <img src={product.productImage} alt="product.title" />
            <h3 className="font-bold text-lg">{product.title}</h3>
            <p className="terx-gray-600">{product.price.toFixed(2)}</p>
            <p className="text-yellow-500">Rating: {product.rating}</p>
            <button
                onClick={() => handleAddToCart(product)}
                className="bg-[#179800] text-white font-bold py-2 px-4 rounded-md hover:bg-[#154x00]"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default PopularProductCard;
