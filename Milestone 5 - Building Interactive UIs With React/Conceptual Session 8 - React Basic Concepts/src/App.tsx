import { Suspense, useState } from 'react';
import './App.css'
import type { ProductType } from './type';
import Products from './components/products/Products';
import BestSelling from './components/bestSelling/BestSelling';


const productsPromise = async (): Promise<ProductType[]>=>{
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
}

const bestSellingPromise = async (): Promise<ProductType[]>=>{
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
}

function App() {

  // const [count, setCount] = useState(0);

  // const handleCount = ()=>{
  //   setCount(count + 1)
  // }
  


  return (
    <>
    {/* <div>Count {count}</div>
    <button onClick={handleCount}>increase count</button> */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Products productsPromise= {productsPromise()}> </Products>
        <h1>Best Selling Products</h1>
        {/* <BestSelling bestSellingPromise={bestSellingPromise()} ></BestSelling> */}
      </Suspense>
    </>
  )
}

export default App
