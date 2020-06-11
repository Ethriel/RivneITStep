// 1
{
    function getLesser(a, b) {
        if (a < b) {
            return a;
        } else {
            return b;
        }
    }

    function getBigger(a, b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }

    let a = +prompt("Enter first num");
    let b = +prompt("Enter second num");
    let sum = 0;
    if (a == b) {
        sum = a + b;
    } else {
        let lesser = getLesser(a, b);
        let bigger = getBigger(a, b);
        for (let i = lesser; i <= bigger; i++) {
            sum += i;
        }
    }
    alert(`Including ${a} and ${b}, sum = ${sum}`);
}

// 2
{
    let a = Math.abs(+prompt("Enter first num"));
    let b = Math.abs(+prompt("Enter second num"));
    let ta = a;
    let tb = b;
    let gcd = 0;
    while (tb) {
        gcd = tb;
        tb = ta % tb;
        ta = gcd;
    }
    alert(`GCD of ${a} and ${b} = ${gcd}`);
}

//3
{
    let a = Math.abs(+prompt("Enter number"));
    let msg = `Divisors of ${a}: `;
    for (let i = 1; i <= a; i++) {
        if (a % i == 0) {
            msg += i + " ";
        }
    }
    alert(msg);
}

// 4
{
    let a = +prompt("Enter number");
    let tmp = a;
    let count = 1;
    while (tmp > 1) {
        count++;
        tmp = tmp / 10;
    }
    alert(`${a} has ${count} digits`);
}

// 5
{
    let num = 0;
    let positives = 0;
    let negatives = 0;
    let zeros = 0;
    let evens = 0;
    let odds = 0;
    let msg = "You have entered: ";
    for (let i = 0; i < 10; i++) {
        num = +prompt("Enter a number");
        msg += num + " ";
        if (num > 0) {
            positives++;
        } else if (num < 0) {
            negatives++;
        } else {
            zeros++;
        }

        if (num % 2 == 0) {
            evens++;
        } else {
            odds++;
        }
    }
    msg += `\nPositives: ${positives},\nNegatives: ${negatives}\nZeros: ${zeros},\nEvens: ${evens},\nOdds: ${odds}`;
    alert(msg);
}

// 6
{
    let proceed = true;
    let signs = ["+", "-", "/", "*"];

    while (proceed == true) {
        let a = +prompt("Enter first num");
        let b = +prompt("Enter second num");
        let res = 0;
        let sign = prompt("Enter sign");
        if (signs.includes(sign) == false) {
            alert("Incorrect sign");
        } else {
            switch (sign) {
                case "+":
                    res = a + b;
                    break;
                case "-":
                    res = a - b;
                    break;
                case "/":
                    if (b == 0) {
                        alert("Division by zero");
                    } else {
                        res = a / b;
                    }
                    break;
                case "*":
                    res = a * b;
                    break;
            }
            alert(`${a} ${sign} ${b} = ${res}`);
            proceed = confirm("Continue?");
        }
    }
}

// 7
{
    let number = +prompt("Enter number");
    if (Number.isNaN(number)) {
        alert("You have entered not a number");
    } else {
        let str = number.toString();
        let shift = +prompt("Enter shift");
        let res = "";
        if (shift >= str.length) {
            alert("Incorrect shift!");
        } else {
            let start = str.substr(0, shift);
            let end = str.substr(shift, str.length - 1);
            res = end + start;
            let shifted = parseInt(res);
            alert(`Your number: ${number}, shifted: ${shifted}`);
        }
    }
}

// 8
{
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let proceed = true;
    let i = 0;
    while (proceed == true) {
        alert(`Day: ${days[i]}`);
        if (i != days.length - 1) {
            i++;
        } else {
            i = 0;
        }
        proceed = confirm("Do you want to see the next day?");
    }
}

// 9
{
    let nums = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    let mults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let num = 0;
    let mult = 0;
    let res = 0;
    let text = "";
    let divMults = document.getElementById("mults");
    for (let i = 0; i < nums.length; i++) {
        num = nums[i];
        text += `<div class='mult-part'>`;
        for (let j = 0; j < mults.length; j++) {
            mult = mults[j];
            res = num * mult;
            text += `<p>${num} * ${mult} = ${res}</p>`;
        }
        text += "</div><br>";
    }
    divMults.innerHTML = text;
}

// 10
{
    let number = +prompt("Enter number from 0 to 100");
    let from = 0;
    let to = 100;
    let N = 0;
    let sign = "";
    while (sign != "==") {
        N = Math.floor(from + (to - from) / 2);

        console.log(`from = ${from}`);
        console.log(`N = ${N}`);
        console.log(`to = ${to}`);

        sign = prompt(`Is yor number <, > or == ${N}?`);
        if (sign == "<") {
            to = N - 1;
        } else if (sign == ">") {
            from = N + 1;
        } else {
            break;
        }
    }
    alert(`I did it! Your number =  ${number}. I guessed ${N}`);
}