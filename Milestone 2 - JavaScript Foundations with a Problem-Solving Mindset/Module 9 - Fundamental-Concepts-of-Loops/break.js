for (let i = 0; i < 100; i++){
    console.log(i);
}


for (let i = 0; i < 100; i++){
    if (i > 5){
        break;
    }
    console.log(i);
}


let count = 0;

while (count < 10){
    if (count > 4){
        console.log("tor sathe breakup");
        break;
    }
    console.log("Value of count", count);
    count++;
}

