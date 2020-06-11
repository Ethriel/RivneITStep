function getStartAndEnd(arr) {
    let min = Math.min.apply(null, arr);
    let max = Math.max.apply(null, arr);
    let minI = arr.indexOf(min);
    let maxI = arr.indexOf(max);
    let start = Math.min(minI, maxI);
    let end = Math.max(minI, maxI);
    return [start, end];
};

function randomInRange(min, max) {
    return Math.trunc(min + Math.random() * (max - min + 1));
};

function getRandomNumbers(quantity) {
    let num = 0;
    let arr = [];
    for (let i = 0; i < quantity; i++) {
        num = randomInRange(1, 100);
        arr.push(num);
    }
    return arr;
};
// 1
{
    let arr = [2, -5, -9, 2, -4, 5, 34, -11, 2, 3, 4, 5, -6, 9];
    let sumNeg = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            sumNeg += arr[i];
        }
    }
    let bounders = getStartAndEnd(arr);
    let mult = 1;
    for (let i = bounders[0]; i <= bounders[1]; i++) {
        mult *= arr[i];
    }
    let msg = `Sum of negative number = ${sumNeg}\n`;
    msg += `Mult between min and max = ${mult}`;
    console.log(msg);
}

// 2
{
    let arr = [45, -65, 48, 52, -45, -78, -96, 25, 14, 25, 45];
    let mult = 1;
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 0) {
            mult *= arr[i];
        }
    }
    let bounders = getStartAndEnd(arr);
    let sum = 0;
    for (let i = bounders[0]; i <= bounders[1]; i++) {
        sum += arr[i];
    }
    let msg = `Mult of even indexes = ${mult}\n`;
    msg += `Sum between min and max = ${sum}`;
}

// 3
{
    let arr = [45, 65, 48, 52, 45, -78, -96, 25, 14, 25, 45];
    let max = Math.max.apply(null, arr);
    let maxI = arr.indexOf(max);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            break;
        } else {
            sum += arr[i];
        }
    }
    console.log(`Index of max = ${maxI}, Sum = ${sum}`);
}

// 4
{
    let arr = getRandomNumbers(100);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    console.log(`Sum = ${sum}`);
}

// 5
{
    let arr = getRandomNumbers(50);
    let mult = 1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 != 0) {
            mult *= arr[i];
        }
    }
    console.log(`Mult = ${mult}`);
}

// 6
{
    let arr = getRandomNumbers(50);
    let indexes = [];
    let min = 1000000;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            indexes.push(i);
        } else if (arr[i] == min) {
            indexes.push(i);
        }
    }
    console.log(`Min = ${min}\n`, "Indexes:\n", indexes);
}