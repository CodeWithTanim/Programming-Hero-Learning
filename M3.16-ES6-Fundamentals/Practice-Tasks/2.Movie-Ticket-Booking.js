function bookTicket(movie, seats = 1, pricePerSeat = 300) {
    if (typeof movie !== 'string' || typeof seats !== 'number' || typeof pricePerSeat !== 'number' || seats < 0 || pricePerSeat < 0) {
        return "Invalid";
    }
    const total = seats * pricePerSeat;
    return `${movie}: ${seats}, Tota: ৳ ${total}`;
};

console.log(bookTicket('Spider Man', 5));
console.log(bookTicket('Spider Man', -3));
console.log(bookTicket('Spider Man'));