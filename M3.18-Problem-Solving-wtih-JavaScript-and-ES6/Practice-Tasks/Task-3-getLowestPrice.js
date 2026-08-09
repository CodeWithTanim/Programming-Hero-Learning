function getLowestPrice (prices) {
    return Math.min(...prices);
};

console.log(getLowestPrice([340, 120, 560, 90]));