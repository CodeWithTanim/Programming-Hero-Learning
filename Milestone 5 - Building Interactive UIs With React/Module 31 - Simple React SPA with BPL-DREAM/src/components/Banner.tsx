import BannerMain from "../assets/banner-main.png";
import BgShadow from "../assets/bg-shadow.png";

const Banner = () => {
    return (
        <section className="container mx-auto mt-30">
            {/* Banner */}
            <div className="relative h-[365px] overflow-hidden rounded-2xl bg-[#111]">

                {/* Background Shadow */}
                <img
                    src={BgShadow}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Banner Content */}
                <div className="relative flex h-full flex-col items-center justify-center text-center">

                    {/* Cricket Image */}
                    <img
                        src={BannerMain}
                        alt="Cricket"
                        className="w-44"
                    />

                    {/* Title */}
                    <h1 className="mt-3 text-3xl font-bold text-white">
                        Assemble Your Ultimate Dream 11 Cricket Team
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-3 text-gray-300">
                        Beyond Boundaries Beyond Limits
                    </p>

                    {/* Button */}
                    <button className="mt-4 rounded-lg bg-lime-400 px-5 py-2 font-semibold text-black">
                        Claim Free Credit
                    </button>

                </div>
            </div>
        </section>
    );
};

export default Banner;