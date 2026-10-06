"use client";

import { authClient } from "@/lib/auth-client";
import { Slide, toast } from "react-toastify";
import Link from "next/link";
import React from "react";

const UserInfo = () => {
    const { data: session } = authClient.useSession();

    const user = session?.user;

    const handleSignOut = async () => {
        const { error } = await authClient.signOut();

        if (error) {
            toast.error("সাইন আউট করতে সমস্যা হয়েছে", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
            });

            return;
        }

        toast.success("সফলভাবে সাইন আউট হয়েছে", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Slide,
        });
    };

    return (
        <div className="flex items-center justify-end gap-2">
            {user ? (
                <div className="flex flex-col items-center gap-2">
                    <Link className="flex flex-col items-center gap-2" href={"/profile"}>
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                <img alt={user.name as string} src={user.image as string} />
                            </div>
                        </div>
                    <h2>{user.name}</h2>
                    </Link>

                    <button onClick={handleSignOut} className="btn btn-error btn-xs">
                        SignOut
                    </button>
                </div>
            ) : (
                <div>
                    <Link href="/signin">
                        <button className="btn">সাইন ইন</button>
                    </Link>

                    <Link href="/signup">
                        <button className="btn bg-red-600 text-white">সাইন আপ</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
