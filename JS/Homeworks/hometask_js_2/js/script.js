// 1
// {
//     let hours = +prompt("Enter hours:");
//     let minutes = +prompt("Enter minutes:");
//     let seconds = +prompt("Enter seconds:");
//     if (hours > 23 || hours < 0 || minutes > 59 || minutes < 0 || seconds > 59 || seconds < 0)
//         alert("Wrong time!");
//     else
//         alert("Good time");
// }
// // 2
// {
//     let x = +prompt("Enter x");
//     let y = +prompt("Enter y");
//     let quarter = "";
//     if (x > 0 && y > 0) {
//         quarter = "First quarter";
//     } else if (x < 0 && y > 0) {
//         quarter = "Second quarter";
//     } else if (x < 0 && y < 0) {
//         quarter = "Third quarter";
//     } else if (x > 0 && y < 0) {
//         quarter = "Fourth quarter";
//     } else {
//         quarter = "Start";
//     }
//     alert(`Point (${x}, ${y}) is in the ${quarter}`);
// }
// // 3
// // 3.1
// {
//     let quan = +prompt("Enter quantity");
//     let msg = "";
//     while (quan != 0) {
//         msg += "#";
//         quan--;
//     }
//     alert(msg);
// }

// // 3.2
// {
//     let num = +prompt("Enter number");
//     let msg = "";
//     while (num != -1) {
//         msg += num + " ";
//         num--;
//     }
//     alert(msg);
// }

// // 3.3
// {
//     let num1 = +prompt("Enter first num");
//     let num2 = +prompt("Enter second num");
//     let tmp = 1;
//     let iterations = Math.min(num1, num2);
//     let msg = "";
//     while (tmp != iterations) {
//         if (num1 % tmp == 0 && num2 % tmp == 0) {
//             msg += tmp + " ";
//         }
//         tmp++;
//     }
//     alert(msg);
// }
// // 3.4
// {
//     let num = +prompt("Enter number");
//     let original = num;
//     let factorial = 1;
//     let msg = "";
//     while (num > 1) {
//         factorial *= num;
//         num--;
//     }
//     msg = `Factorial of ${original} = ${factorial}`;
// }
// // 4
// {
//     let num = +prompt("Enter number");
//     let original = num;
//     let i = 1;
//     let divisors = 0;
//     do {
//         if (original % i == 0) {
//             divisors++;
//         }
//         i++;
//     } while (i != num+1);
//     let msg = "";
//     if (divisors == 2) {
//         msg = `Number ${original} is prime`;
//     } else {
//         msg = `Number ${original} is not prime`;
//     }
//     alert(msg);
// }

// 5
{
    let fruits = ["apple", "grapes", "pear", "avocado", "banana", "blackberries"];

    function listFruits() {
        let res = "<ul>";
        let fruit = "";
        for (let i = 0; i < fruits.length; i++) {
            fruit = fruits[i];
            res += `<li>${fruit}</li>`;
        }
        res += "</ul>";
        document.write(res);
    }

    function findFruit() {
        let fruit = document.getElementById("searchText").value;
        let fruitStr = String(fruit);
        let index = NaN;
        for (let i = 0; i < fruits.length; i++) {
            if (fruits[i] == fruitStr.toLowerCase()){
                index = i;
                break;
            }
        }
        if (Number.isNaN(index)) {
            document.getElementById("foundFruit").innerText = `${fruit} was not found`;
        } else {
            document.getElementById("foundFruit").innerText = `Index of ${fruit} is ${index}`;
        }
    }
}