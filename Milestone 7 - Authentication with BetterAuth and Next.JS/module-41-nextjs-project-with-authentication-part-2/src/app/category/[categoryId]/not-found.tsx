import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-[70vh] w-full flex items-center justify-center bg-white">

            <div className="text-center px-4">

                <h1 className="text-4xl font-bold text-gray-900">
                    ৪০৪
                </h1>

                <p className="text-gray-500 mt-3">
                    এই পাতাটি পাওয়া যায়নি।
                </p>

                <Link
                    href="/"
                    className="inline-block mt-6 text-red-600 hover:text-red-700 font-medium"
                >
                    হোমপেজে ফিরুন
                </Link>

            </div>

        </div>
    );
};

export default NotFound;