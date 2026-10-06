import Link from 'next/link';
import React from 'react';

interface NavLink {
    slug: string;
    title: string;
    topicId: string | null;
    scrapable: boolean;
}

const NavLinks = async () => {

    const res = await fetch('https://news-api-v2.vercel.app/api/categories');
    const data = await res.json();
    const navs: NavLink[] = data.data
    // console.log(navs, 'NavLinks');
    const filteredNavs = navs.filter(nav => nav.scrapable)

    return (
        <div className='flex gap-4 justify-center mt-2 mb-3'>
            <Link href='/'>হোম</Link>
            {filteredNavs.map((nav, index) => <Link key={index} href={`/category/${nav.slug}`}>{nav.title}</Link>)}
        </div>
    );
};

export default NavLinks;