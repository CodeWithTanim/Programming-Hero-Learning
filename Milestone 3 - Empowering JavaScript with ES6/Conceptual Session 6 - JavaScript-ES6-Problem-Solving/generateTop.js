function generateTopScorers(students) { 
    if (!Array.isArray(students)) { 
        return "Invalid"; 
    } 
 
    if (students.length == 0) { 
        return "Invalid"; 
    } 

    if(students.some(student=> !student.name || !student.score )){
        return "Invalid"
    }
 
    const qualified = students.filter(student => student.score > 60); 
    console.log(qualified);
 
    const names = qualified.map(student => student.name.toUpperCase()); 
 
    return names.slice(0, 3); 
}


const returnResult = generateTopScorers([
    { name: "Rafi", score: 80 },
    { name: "Sadia", score: 55 },
    { name: "Karim", score: 70 },
    { name: "Nafis", score: 65 },
    { name: "Modu", score: 90 }
])

console.log(returnResult)


