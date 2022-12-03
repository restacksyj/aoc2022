const inputData = require('./input-1,2.ts')

const arr = inputData.split("\n");
arr.shift()

let sum=0
let sumsArr:Array<number> = []

for (let i = 0; i < arr.length; i++){
    if(arr[i] !== ""){
        sum = sum + +arr[i]
    } else {
        sumsArr.push(sum);
        sum = 0
    }
}

const sortsums = sumsArr.sort((a:number,b:number) => a - b).reverse()

console.log(sortsums[0] + sortsums[1] + sortsums[2])
