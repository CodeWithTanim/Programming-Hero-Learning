"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [show, setShow] = useState(false);

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newUserData = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
    };

    await authClient.updateUser({
      ...newUserData,
    });

    setShow(false);
  };

  const handleShowForm = () => {
    setShow(!show);
  };

  // if (!user) {
  //   redirect('/signin')
  // }



  // Loading State
  if (isPending) {
    return (
      <main className="min-h-screen bg-white px-4 py-8">
        <div className="flex min-h-[60vh] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-red-600"></span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto w-[650px] max-w-[calc(100vw-32px)]">

        {/* ================= PROFILE HEADER ================= */}
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Cover */}
          <div className="h-36 bg-linear-to-r from-red-600 via-red-500 to-red-700 sm:h-44"></div>

          {/* Profile Information */}
          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-16 flex flex-col items-center sm:flex-row sm:items-end sm:gap-5">

              {/* Profile Image */}
              <div className="avatar shrink-0">
                <div className="w-28 rounded-full border-4 border-white bg-gray-100 shadow-md sm:w-32">
                  <img
                    src={
                      user?.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.name || "User"
                      )}&background=dc2626&color=fff`
                    }
                    alt={user?.name || "User"}
                  />
                </div>
              </div>

              {/* Name & Email */}
              <div className="mt-3 min-w-0 flex-1 sm:mb-1 sm:mt-0">
                <h1 className="break-words text-center text-2xl font-bold leading-tight text-gray-900 sm:text-left">
                  {user?.name}
                </h1>

                <p className="mt-1 break-all text-center text-sm text-gray-500 sm:text-left">
                  {user?.email}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ================= ACCOUNT INFORMATION ================= */}
        <div className="mt-6 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-gray-900">
              অ্যাকাউন্ট তথ্য
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              আপনার অ্যাকাউন্টের সাধারণ তথ্য
            </p>
          </div>

          {/* Name */}
          <div className="border-b border-gray-100 px-6 py-5">
            <p className="text-sm text-gray-500">
              নাম
            </p>

            <p className="mt-1 break-words font-medium text-gray-900">
              {user?.name}
            </p>
          </div>

          {/* Email */}
          <div className="border-b border-gray-100 px-6 py-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div className="min-w-0">
                <p className="text-sm text-gray-500">
                  ইমেইল
                </p>

                <p className="mt-1 break-all font-medium text-gray-900">
                  {user?.email}
                </p>
              </div>

              {user?.emailVerified && (
                <span className="badge badge-success badge-outline shrink-0">
                  Verified
                </span>
              )}

            </div>
          </div>

          {/* User ID */}
          <div className="px-6 py-5">
            <p className="text-sm text-gray-500">
              User ID
            </p>

            <p className="mt-1 break-all font-mono text-sm text-gray-700">
              {user?.id}
            </p>
          </div>

          {/* Update Profile Button */}
          <div className="border-t border-gray-100 px-6 py-5">
            <button
              type="button"
              onClick={handleShowForm}
              className="btn border-none bg-red-600 px-6 text-white hover:bg-red-700"
            >
              প্রোফাইল আপডেট করুন
            </button>
          </div>

          {/* ================= UPDATE PROFILE FORM ================= */}
          {show && (
            <form
              onSubmit={handleUpdateProfile}
              className="border-t border-gray-200 space-y-5 p-6"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  নাম
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={user?.name || ""}
                  className="input w-full border-gray-300 focus:border-red-500 focus:outline-none"
                  placeholder="আপনার নাম লিখুন"
                />
              </div>

              {/* Profile Image */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  প্রোফাইল ইমেজ URL
                </label>

                <input
                  id="image"
                  name="image"
                  type="url"
                  defaultValue={user?.image || ""}
                  className="input w-full border-gray-300 focus:border-red-500 focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">

                <button
                  type="submit"
                  className="btn border-none bg-red-600 px-6 text-white hover:bg-red-700"
                >
                  আপডেট করুন
                </button>

                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="btn border border-gray-300 bg-white px-6 text-gray-700 hover:bg-gray-100"
                >
                  বাতিল
                </button>

              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;