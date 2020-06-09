// 1
// let numTaskOne = +prompt("Enter a number");
// alert(`${numTaskOne ^ 2} = ${numTaskOne**2}`);

// 2
// let numFirstTaskTwo = +prompt("Enter first number");
// let numSecondTaskTwo = +prompt("Enter second number");
// let numAvgTaskTwo = (numFirstTaskTwo + numSecondTaskTwo) / 2;
// alert(`Average between ${numFirstTaskTwo} and ${numSecondTaskTwo} = ${numAvgTaskTwo}`);

// 3
// let squareSide = +prompt("Enter square side length");
// alert(`Square = ${squareSide*squareSide}`);

// 4
// const mile = 0.621371;
// let kms = +prompt("Enter kms");
// alert(`${kms} kms = ${kms*mile} miles`);

// 5
// let numOneCalc = +prompt("Enter first num");
// let numTwoCalc = +prompt("Enter second num");
// alert(`<p>${numOneCalc} + ${numTwoCalc} = ${numOneCalc + numTwoCalc}</p>`);
// alert(`<p>${numOneCalc} - ${numTwoCalc} = ${numOneCalc - numTwoCalc}</p>`);
// alert(`<p>${numOneCalc} * ${numTwoCalc} = ${numOneCalc * numTwoCalc}</p>`);
// if (numTwoCalc == 0) {
//     alert("Division by zero");
// } else {
//     alert(`<p>${numOneCalc} / ${numTwoCalc} = ${numOneCalc / numTwoCalc}</p>`);
// }

// 6
// let a = +prompt("Enter a");
// let b = +prompt("Enter b");
// let x = 0;
// if (a == 0) {
//     x = 0;
// } else if (a == 1) {
//     x = -b;
// } else {
//     x = -b / a;
// }
// alert(`<p>x = ${x}</p>`);

// 7
// const dayHours = 24;
// const minutesInHour = 60;
// let hours = +prompt("Enter hours");
// let minutes = +prompt("Enter minutes");
// if (hours > dayHours) {
//     alert("Hours can't be more than 24");
// } else if (minutes > minutesInHour) {
//     alert("Minutes can't be more than 60");
// } else {
//     let hoursDiff = dayHours - hours;
//     let allMinutes = hoursDiff * minutesInHour + minutes;
//     console.log("All minutes = ", allMinutes);
//     let resHours = Math.floor(allMinutes / minutesInHour);
//     let resMinutes = minutesInHour - allMinutes % minutesInHour;
//     alert(`${resHours} hours and ${resMinutes} minutes till tomorrow`);
// }

// 8
// let number8 = +prompt("Enter 3-digit num");
// let res8 = Math.floor(number8 / 10) % 10;
// alert(`Second digit = ${res8}`);

// 9
// let numer9 = +prompt("Enter 5-digit num");
// let res9 = numer9 % 10;
// let result = parseInt(numer9 / 10);
// alert(res9 + "" + result);

// 10
// let sales = +prompt("Enter sales");
// let res = sales * 0.1 +250;
// alert(`Your salary: ${res}`);

// 11
// let hours = +prompt("Enter hours:");
// let minutes = +prompt("Enter minutes:");
// let seconds = +prompt("Enter seconds:");
// if (hours > 23 || hours < 0 || minutes > 59 || minutes < 0 || seconds > 59 || seconds < 0)
//     alert("Wrong time!");
// else
//     alert("good time");