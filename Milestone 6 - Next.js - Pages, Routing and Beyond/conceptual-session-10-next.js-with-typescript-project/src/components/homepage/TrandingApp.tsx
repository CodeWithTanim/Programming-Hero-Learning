import { TApp } from '@/types/apps.types';
import React from 'react';
import AppCard from '../shared/AppCard';
import Link from 'next/link';
import { getAllApps } from '@/lib/apps';



const TrandingApp = async () => {

    const data = await getAllApps();


    return (
        <div className='my-20 container mx-auto'>
            <div className='space-y-4 mx-w-[400px] mx-auto text-center'>
                <h2 className='font-semibold text-3xl'>Tranding Apps</h2>
                <p>Explore All Trending Apps on the Market developed by us</p>
            </div>

            {/* Data */}
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6'>
                {
                    data.slice(0, 8).map((app: TApp, index: number) => {
                        return <AppCard key={index} app={app} />
                    })
                }
            </div>
            <div className="flex justify-center mt-8">
                <Link
                    href="/apps"
                    className="flex items-center gap-2 rounded-md bg-linear-to-r from-[#7C3AED] to-[#A855F7] px-5 py-3 text-[18px] font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                >
                    Show All
                </Link>
            </div>
        </div>
    );
};

export default TrandingApp;