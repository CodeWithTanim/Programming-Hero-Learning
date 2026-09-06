const age = 22;
const hasVoterIDCard = false;

if (age > 18){
    if(hasVoterIDCard === true){
        console.log('yes you can vote');
    }
    else{
        console.log('get your ID card to vote.');
    }
}
else{
    console.log('you cannot vote.');
}