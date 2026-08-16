const books:string[] = ['book1', 'book1', 'book2'];

const runs:number[] = [10, 20, 30, 40, 50];

const shoppingList:[string, number] = ['iPhone', 15000];


const book: {
    name: 'Chemistry',      // Lateral
    Author: string,
    price: number,
    pages: number,
    isUsed?: boolean,       // Optional Property
} = {
    name: 'Chemistry2',     // Chemistry2 will not use as default is Chemistry
    Author: 'Hazari Naag',
    price: 500,
    pages: 300,
    // isUsed: true,        for optional property
};

// book.name = 'Physics'        // Will not work as Chemsitry is a default

