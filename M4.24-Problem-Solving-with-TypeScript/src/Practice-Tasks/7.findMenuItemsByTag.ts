interface MenuItem {
    name: string
    price: number
    tag: string
}

function findMenuItemsByTag(menu: MenuItem[], tag: string): MenuItem[] {
    return menu.filter((item) => item.tag === tag)
}

const menu = [
    { name: "Veggie Bowl", price: 350, tag: "vegan" },
    { name: "Tofu Wrap", price: 300, tag: "vegan" },
    { name: "Chicken Wings", price: 450, tag: "spicy" },
    { name: "Beef Burger", price: 500, tag: "spicy" }
];



console.log(findMenuItemsByTag(menu, 'vegan'))
console.log(findMenuItemsByTag(menu, 'gluten-free'))
console.log(findMenuItemsByTag(menu, 'spicy'))