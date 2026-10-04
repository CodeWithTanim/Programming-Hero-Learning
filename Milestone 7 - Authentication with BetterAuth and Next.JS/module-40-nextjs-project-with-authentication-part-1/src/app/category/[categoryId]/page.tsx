import NewsCard from '@/components/NewsCard';
import React from 'react';

interface News {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
    firstPublished: string;
}

const CategoryNewsIdPage = async ({ params }: { params: { categoryId: string } }) => {
    const { categoryId } = await params;
    // console.log(categoryId, 'category id')
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`)
    const data = await res.json()
    // console.log(data, 'category id data')

    const categoryNews: News[] = data.data


    return (
        <div>
            <h1 className='text-2xl bold border-b-2 border-red-700 mb-5 mt-3'>{data.title}</h1>

            <div className='grid grid-cols-3 gap-10'>
                {
                    categoryNews.map(news => <NewsCard key={news.id} news={news} />)
                }
            </div>
        </div>
    );
};

export default CategoryNewsIdPage;