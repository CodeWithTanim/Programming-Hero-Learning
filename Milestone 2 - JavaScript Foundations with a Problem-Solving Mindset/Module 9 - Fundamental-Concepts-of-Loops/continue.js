// for (let i = 0; i <= 10; i++){
//     console.log("Value of i", i);
// }

// 2 skip 
for (let i = 0; i <= 10; i++){
    if(i===2){ // 2 will be skip
        continue; // for skip
    }
    console.log("Value of i", i);
}

// devided by 2 is skip
for (let i = 0; i <= 10; i++){
    if(i%2 === 0){
        continue; // for skip
    }
    console.log("Value of i", i);
}
