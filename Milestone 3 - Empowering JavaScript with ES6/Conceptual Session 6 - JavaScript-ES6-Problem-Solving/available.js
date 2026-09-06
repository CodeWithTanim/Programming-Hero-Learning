const filterAvailable = (products) =>{

    const filteredData = products.filter(product=> product.inStock == true)
    // filteredData = [{name:"Shirt", inStock:true}, {name:"pant", inStock:true} ]
    return filteredData;

}

const returnResult = filterAvailable(
    [ 
        {name:"Shirt", inStock:true}, 
        {name:"Shoes", inStock:false} ,
    ] 
)


console.log(returnResult)