const inputData = require('./input-1,2.ts')

//splitting input on \n since it has newlines
const arr = inputData.split("\n");
// deleting the first empty "" from the input
arr.shift()

let maxSum = 0

let sum=0

for (let i = 0; i < arr.length; i++){
    if(arr[i] !== ""){
        sum = sum + +arr[i]
    } else {
        if (sum > maxSum) maxSum = sum;
        sum = 0
    }
}

console.log(maxSum)
