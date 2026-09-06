type Product = {
    id: number;
    name: string;
    price: number;
    description?: string;
};


const products: Product[] = [{
    id: 1,
    name: 'Laptop',
    price: 999.99,
    description: 'High Performance Laptop for professionals',
}, {
    id: 2,
    name: 'Smartphone',
    price: 9599.99,
    description: 'Latest model smartphone with advance features',
}];