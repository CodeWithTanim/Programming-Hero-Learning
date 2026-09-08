import { use } from "react";
import type { ProductType } from "../../type"
import Product from "../product/Product";

export type BestSellingProps = {
    bestSellingPromise: Promise<ProductType[]>
}

export default function BestSelling({ bestSellingPromise }: BestSellingProps) {

    const bestSellingProducts = use(bestSellingPromise);
    
    return(<>
    <div className="grid-container">
        {
            bestSellingProducts.slice(0,10).map((product,index)=> <Product product={product} key={index} ></Product>)
        }
    </div>

    </>) 
}