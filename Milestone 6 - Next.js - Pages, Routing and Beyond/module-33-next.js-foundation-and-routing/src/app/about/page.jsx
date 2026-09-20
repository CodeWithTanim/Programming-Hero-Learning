import Image from 'next/image';
import React from 'react';

export const metadata = {
  title: "About Us",
  description: "This is about us",
};


const aboutPage = () => {
    return (
        <div>
            <h2>About us</h2>
            <Image src="/photo.png" width={300} height={400} alt="Tanim"></Image>
            <Image src="/images/samiur.png" width={300} height={400} alt="Samiur"></Image>
            <Image src="/images/tanim4.jpg" width={300} height={400} alt="Tanim4"></Image>
            <Image src="https://images.unsplash.com/photo-1789349050765-5f6227d041e2" width={300} height={400} alt="Outside Image"></Image>
            <Image src="https://i.ibb.co/tTnb0zFM/Code-With-Tanim.png" width={300} height={400} alt="Outside Image"></Image>
        </div>
    );
};

export default aboutPage;