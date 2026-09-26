const States = () => {
    return (
        <section className="bg-linear-to-r from-[#6d28d9] to-[#a855f7] text-white">
            <div className="max-w-300 mx-auto px-4 py-16">
                {/* Title */}
                <h2 className="text-center text-4xl md:text-5xl font-bold">
                    Trusted By Millions, Built For You
                </h2>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mt-10">
                    {/* Total Downloads */}
                    <div className="text-center">
                        <p className="text-sm text-white/75">
                            Total Downloads
                        </p>

                        <h3 className="text-5xl font-bold mt-3">
                            29.6M
                        </h3>

                        <p className="text-sm text-white/75 mt-4">
                            21% More Than Last Month
                        </p>
                    </div>

                    {/* Total Reviews */}
                    <div className="text-center">
                        <p className="text-sm text-white/75">
                            Total Reviews
                        </p>

                        <h3 className="text-5xl font-bold mt-3">
                            906K
                        </h3>

                        <p className="text-sm text-white/75 mt-4">
                            46% More Than Last Month
                        </p>
                    </div>

                    {/* Active Apps */}
                    <div className="text-center">
                        <p className="text-sm text-white/75">
                            Active Apps
                        </p>

                        <h3 className="text-5xl font-bold mt-3">
                            1324+
                        </h3>

                        <p className="text-sm text-white/75 mt-4">
                            31 More Will Launch
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default States;