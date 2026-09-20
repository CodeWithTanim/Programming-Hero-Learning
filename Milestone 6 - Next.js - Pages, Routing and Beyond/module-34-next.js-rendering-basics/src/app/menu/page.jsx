import React from 'react';
import FoodCart from '../components/FoodCart';

const MenuPage = async() => {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/foods/top-foods')
    const data = await res.json()
    const foods = data.data;

    console.log('Food Data', data)

    
    return (
        <div>
            <h2>Menu Page</h2>
            <div className='grid grid-cols-3 gap-4'>
                {
                    foods.map(food => <FoodCart key={food.id} food={food}/>)
                }
            </div>
        </div>
    );
};

export default MenuPage;