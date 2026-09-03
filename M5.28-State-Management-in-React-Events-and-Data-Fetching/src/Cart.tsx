export default function Cart () {
    let counter = 0;

    const handleAddToCart = () => {
        counter += 1
    }
    return (
        <div>
            <h3>Shoping Cart</h3>
            <p>Items in the Cart: {counter}</p>
            <button onClick={handleAddToCart}>Add Onne More to Cart</button>
        </div>
    )
}