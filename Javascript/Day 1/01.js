// A program to check if a number is odd or even.
const prompt = require('prompt-sync')();

console.log("Welcome")
let number = prompt("Enter a value: ")

const result = number % 2 === 0 ? "Even" : "Odd";
console.log(result)