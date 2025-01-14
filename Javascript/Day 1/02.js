// Program to Check number positive or negative

const prompt = require('prompt-sync')();

// console.log("Himanshu")
function checkNumber(num) {
    if (num > 0){
        console.log(num + " is a positive number");
    }
    else if (num < 0){
        console.log(num + " is a negative number");
    }
    else{
        console.log(num + " is zero");
    }
}
    
let a = prompt("Enter a number: ");

checkNumber(a)
