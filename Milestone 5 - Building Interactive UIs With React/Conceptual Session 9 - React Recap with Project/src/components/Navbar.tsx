import { FaSearch, FaShoppingCart } from "react-icons/fa";
import type { IPopularProduct } from "../types/product";
import type { Dispatch, SetStateAction } from "react";

interface INavbarProps {
    cart: IPopularProduct[];
    setCart: Dispatch<SetStateAction<IPopularProduct[]>>
}

const Navbar = ({cart}: INavbarProps) => {
    return (
        <div className="border-b border-gray-300 bg-[#FEFEFE]">
            <nav className="flex justify-between gap-4 container mx-auto py-4">
                <img src="../assets/nav-logo.png" className="w-30 h-15" alt="" />
                <ul className="flex items-center gap-4">
                    <li>
                        <a href=",/">Home</a>
                    </li>
                    <li>
                        <a href=",/"></a>About
                    </li>
                    <li>
                        <a href=",/"></a>Contact
                    </li>
                    <li>
                        <a href=",/"></a>Services
                    </li>
                    <li>
                        <a href=",/"></a>
                    </li>
                </ul>
                <div className="flex gap-4 items-center">
                    <FaSearch />
                    <FaShoppingCart />
                    <span className="bg-[#179800] text-white px-2 py-1 rounded-full text-sm">
                        {cart.length}
                    </span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:scale-110 transition-transform duration-300">
                        Login
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green hover:scale-110 transition-transform duration-300">
                        SignUp
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
