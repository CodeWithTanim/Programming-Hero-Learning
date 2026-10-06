
import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

interface IOtherSection {
    curationId: string;
    title: string;
    articles: {
        id: string;
        title: string;
        description: string;
        firstPublished: string;
        category: string;
        imageUrl: string;
        imageAlt: string;
    }[];
}

export default async function Home() {
    const res = await fetch(
        'https://news-api-v2.vercel.app/api/news/sections'
    );

    const data = await res.json();
    const sections = data.data;

    const mainNews = sections[0].articles;
    const otherSections: IOtherSection[] = sections.slice(1);

    return (
        <div>
            {/* Main Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">

                {/* Left Side: News Sections */}
                <div className="md:col-span-2">

                    {/* Featured News */}
                    <MainNews news={mainNews} />

                    {/* Other News Sections */}
                    <div className="grid gap-5 mt-5">

                        {otherSections.map((otherSection) => (
                            <div key={otherSection.curationId}>

                                {/* Section Title */}
                                <h1 className="font-bold border-b-2 pb-2 border-red-700">
                                    {otherSection.title}
                                </h1>

                                {/* News Cards */}
                                <div className="grid grid-cols-3 gap-2 mt-5">

                                    {otherSection.articles.map((news) => (
                                        <NewsCard
                                            key={news.id}
                                            news={news}
                                        />
                                    ))}

                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {/* Right Side: Most Read */}
                <div className="md:col-span-1">
                    <MostRead />
                </div>

            </div>
        </div>
    );
}
