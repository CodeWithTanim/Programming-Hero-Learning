import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/book.ico";

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-base-200 bg-base-100">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src={logo} alt="Book Vibe Logo" className="h-8 w-8" />

                            <span className="text-xl font-bold">Book Vibe</span>
                        </Link>

                        <p className="mt-4 max-w-md text-sm leading-6 text-base-content/60">
                            Discover your next favorite book, keep track of what you&apos;ve
                            read, and build your personal reading collection with Book Vibe.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 font-semibold text-base-content">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-sm text-base-content/60">
                            <li>
                                <Link href="/" className="transition hover:text-base-content">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/books"
                                    className="transition hover:text-base-content"
                                >
                                    Books
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/listed-books"
                                    className="transition hover:text-base-content"
                                >
                                    Listed Books
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/read-books"
                                    className="transition hover:text-base-content"
                                >
                                    Read Books
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="mb-4 font-semibold text-base-content">Account</h3>

                        <ul className="space-y-3 text-sm text-base-content/60">
                            <li>
                                <button className="transition hover:text-base-content">
                                    Sign In
                                </button>
                            </li>

                            <li>
                                <button className="transition hover:text-base-content">
                                    Sign Up
                                </button>
                            </li>

                            <li>
                                <Link
                                    href="/listed-books"
                                    className="transition hover:text-base-content"
                                >
                                    My Books
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 flex flex-col gap-3 border-t border-base-200 pt-6 text-sm text-base-content/50 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Book Vibe. All rights reserved.</p>

                    <p>Made for people who love to read.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
