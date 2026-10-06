"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { Slide, toast } from "react-toastify";

const SignInPage = () => {
    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: "/",
        });

        if (data) {
            console.log(data, "when signin");
            toast.success("সাঠিকভাবে সাইন ইন হয়েছে", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
        if (error) {
            console.log(error, "when signin");
            toast.error("সাইন ইন করতে সমস্যা হয়েছে", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    };

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        console.log(data, 'Google SignIn')
    };

    const handleGitHubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });
        console.log(data, 'GitHub SignIn')
    };

    return (
        <div className="mt-5">
            <h2 className="text-center text-2xl font-bold text-red-600">
                সাইন ইন করুন
            </h2>
            <form onSubmit={onSubmit}>
                <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend"></legend>

                    <label className="label">ইমেইল</label>
                    <input
                        name="email"
                        type="email"
                        className="input"
                        placeholder="Email"
                    />

                    <label className="label">পাসওয়ার্ড</label>
                    <input
                        name="password"
                        type="password"
                        className="input"
                        placeholder="Password"
                    />

                    <button type="submit" className="btn text-white bg-red-600 mt-4">
                        সাইন ইন করুন
                    </button>
                </fieldset>
            </form>
            <button onClick={handleGoogleSignIn} className="btn w-xs border border-blue-300 bg-sky-400 p-4 text-white hover:bg-blue-500 mt-5">
                গুগল দিয়ে সাইন ইন করুন
            </button><br/>
            <button
  onClick={handleGitHubSignIn}
  className="btn w-xs border border-white bg-black p-4 text-white hover:bg-gray-900 mt-5"
>
  গিটহাব দিয়ে সাইন ইন করুন
</button>
        </div>
    );
};

export default SignInPage;
