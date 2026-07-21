const totalAmount = 1500;
const isMember = true;

if (totalAmount > 1000 && isMember) {
    console.log("20% Discount");
    const discount = 20;
    const discountAmount = (totalAmount/100)*discount;
    const payAmount = totalAmount - discountAmount;
    console.log("So You have to Pay: ", payAmount);
} else if (totalAmount > 1000){
    console.log("10% Discount");
    const discount = 10;
    const discountAmount = (totalAmount/100)*discount;
    const payAmount = totalAmount - discountAmount;
    console.log("So you have eto Pay: ", payAmount);
} else{
    console.log("NO DISCOUNT!");
}