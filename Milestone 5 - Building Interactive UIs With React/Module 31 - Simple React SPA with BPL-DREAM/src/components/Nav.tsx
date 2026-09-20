import { AiFillDollarCircle } from "react-icons/ai";
import Logo from "../assets/logo.png";

const Nav = ({ coin }: { coin: number }) => {
    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm">
            <div className="container mx-auto flex items-center justify-between py-4">
                {/* Logo */}
                <img src={Logo} alt="Logo" className="h-10 w-auto" />

                {/* Navigation */}
                <ul className="flex items-center gap-6">
                    <li>
                        <a href="#" className="text-gray-700 hover:text-primary">
                            Home
                        </a>
                    </li>

                    <li>
                        <a href="#" className="text-gray-700 hover:text-primary">
                            Fixture
                        </a>
                    </li>

                    <li>
                        <a href="#" className="text-gray-700 hover:text-primary">
                            Teams
                        </a>
                    </li>

                    <li>
                        <a href="#" className="text-gray-700 hover:text-primary">
                            Schedule
                        </a>
                    </li>
                </ul>

                {/* Coins */}
                <h2 className="flex items-center gap-1 text-2xl font-bold text-black">
                    {coin}
                    <AiFillDollarCircle className="text-yellow-500" />
                </h2>
            </div>
        </nav>
    );
};

export default Nav;