import Link from 'next/link';
import React from 'react';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Headlines {
    id: number;
    title: string;
}


const Marquee = async () => {

    const res = await fetch('https://news-api-v2.vercel.app/api/news?limit=10');
    const data = await res.json();
    const headlines: Headlines[] = data.data;
    // console.log(headlines, 'Marquee headlines');

    return (
        <div className='bg-red-600 text-white'>

            <div className='flex max-w-7xl mx-auto font-bold'>
                <div className='bg-red-700 py-1 px-5'>সর্বশেষ</div>

                <MarqueeText className='py-1' direction='right' duration={20}>
                    {
                        headlines.map(headline => <Link href={`/article/${headline.id}`} key={headline.id}>
                            <span>{headline.title}</span>
                            <span className="mx-5">•</span>
                        </Link>)
                    }
                </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;