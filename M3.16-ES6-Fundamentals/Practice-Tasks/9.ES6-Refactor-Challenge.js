const refactorToES6 = (items) => {

    const total = items.reduce(
        (sum, item) => sum + item.price,
        0
    );

    return `Total: ${total} Taka`;
};