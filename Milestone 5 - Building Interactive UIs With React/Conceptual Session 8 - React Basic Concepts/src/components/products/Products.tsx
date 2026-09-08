import { use, useState } from "react"
import type { ProductType } from "../../type"
import './Products.css'
import Product from "../product/Product";

export interface ProductsProps {
    productsPromise: Promise<ProductType[]>
}

export default function Products({ productsPromise }: ProductsProps) {

    const products = use(productsPromise);

    const [cartProducts, setCartProduct] = useState<ProductType[]>([])

    const handleCartUpdate = (product: ProductType):void =>{
        let newCartProducts = [...cartProducts, product]

        if(cartProducts.includes(product)){   //    2 !== 2
           newCartProducts = cartProducts.filter(p=> p.id != product.id)
        }
        setCartProduct(newCartProducts)

    }


    return (
        <>
        <h1>Cart Items: {cartProducts.length}</h1>
            <div className="grid-container">
                {
                    products.map((product,index) => <Product handleCartUpdate={handleCartUpdate} key={index} product={product}></Product>)
                }
            </div>
        </>
    )
}