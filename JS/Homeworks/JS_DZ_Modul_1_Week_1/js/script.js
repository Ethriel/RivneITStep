// 1
let name = prompt("Enter your name");
alert(`Hello, ${name}`);

// 2
const currentYear = 2020;
let year = +prompt("Enter your year of birth");
if (year > currentYear) {
    alert("Incorrect year. Try again");
} else {
    alert(`Your age = ${currentYear - year} years`);
}

// 3
let side = +prompt("Enter side of a square");
alert(`Square = ${side * side}`);

// 4
let circleRadius = +prompt("Enter circle radius");
alert(`Circle square = ${Math.PI * circleRadius ** 2}`);

// 5
let distance = +prompt("Enter distance");
let time = +prompt("Enter time");
alert(`Speed = ${distance/time} km/h`);

// 6
const eur = 0.88;
let usd = +prompt("Enter dollars");
alert(`${usd} $ = ${usd*eur} eur`);

// 7
const file = 820;
let gbs = +prompt("Enter flashdrive volume in GB");
alert(`Quantity of files (size = 820 MB) = ${Math.trunc((gbs*1000) / file)}`);

// 8
let money = +prompt("Enter your money");
let price = +prompt("Enter chocolate price");
let crude = money / price;
let chocolates = Math.trunc(crude);
let change = crude - chocolates;
alert(`Quantity of chocolates = ${chocolates}, change = ${change}`);

// 9
let num = +prompt("Enter number");
let original = num;
let digit, result = 0;
while (num) {
    digit = num % 10;
    result = (result * 10) + digit;
    num = num / 10 | 0;
}
console.log(result);
alert(`Reverse of ${original} = ${result}`);

// 10

let number = +prompt("Enter a number");
let isOdd = number & 1;
let isEven = !(number & 1);
alert(`Is odd = ${isOdd}, Is even = ${isEven}`);