import { Suspense, useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Services from "./components/Services";
import PopularProducts from "./components/PopularProducts";
import type { IPopularProduct } from "./types/product";
import Cart from "./components/Cart";

const userFetch = async (): Promise<IPopularProduct[]> => {
    const response = await fetch("/popularProducts.json");
    const data = await response.json();
    return data;
};


const App = () => {
    const usersPromise = userFetch();
    const [cart, setCart] = useState<IPopularProduct[]>([]);

    return (
        <>
            <Navbar cart={cart} setCart={setCart} />
            <Banner />
            <Services />
            <Cart cart={cart} />
            <Suspense fallback={<div>Loading Popular Products...</div>}>
                <PopularProducts
                    usersPromise={usersPromise}
                    cart={cart}
                    setCart={setCart}
                />
            </Suspense>
        </>
    );
};

export default App;
