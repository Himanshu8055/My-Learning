// Use a loop to print numbers from 1 to 20 that are divisible by 3.

function divisibleBy(num){
    for(let i = 0; i<=20; i++){
        if(i % num == 0){
            console.log(i);
        }
    }
    return;
}

divisibleBy(3);
