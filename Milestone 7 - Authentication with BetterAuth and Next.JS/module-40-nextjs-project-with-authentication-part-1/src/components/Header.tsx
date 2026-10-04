import Image from "next/image";
import React from "react";
import logo from "../../public/logo.webp";
import NavLinks from "./NavLinks";

const Header = () => {
    const data = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header className="border-b border-gray-300">
            <div className="max-w-7xl mx-auto grid grid-cols-3 items-center p-4">
                {/* Empty Left Space */}
                <div></div>

                {/* Logo & Website Name */}
                <div className="flex items-center justify-center gap-2">
                    <Image src={logo} alt="Logo" width={50} height={50} />

                    <div>
                        <h2 className="text-xl font-bold">Bangla News Portal</h2>
                        <p className="text-sm text-gray-500">{data}</p>
                    </div>
                </div>

                {/* Authentication Buttons */}
                <div className="flex items-center justify-end gap-2">
                    <button className="btn">সাইন ইন</button>

                    <button className="btn bg-red-600 text-white">সাইন আপ</button>
                </div>
            </div>

            {/* Navigation Bar */}
            <NavLinks/>
        </header>
    );
};

export default Header;
