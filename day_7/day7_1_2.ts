const { readInput } = require('./utility.ts')
const arr = readInput("./day7_prod.txt")

let hashmap:Record<string, any>= {"/": {}}
const directories: Array<string> = [];

function parseInput(arr:Array<any>){
    for ( let i = 0; i < arr.length; i++ ){
        const line = arr[i].split(" ")
        if (line.length === 3){
            const [, , dir] = line
            if (dir !== ".."){
                    directories.push(dir);
                    prepareHashmap(directories, hashmap)
            } else {
                directories.pop()
            }
        } else {
            const [lhs, rhs] = line
            if (lhs !== "$" && lhs!== "dir"){
                    determinePath(directories, hashmap, rhs, lhs)
            }
        }
    }
}

//very bad way I know
function prepareHashmap(directories: Array<string>, hashmap: any){
    // console.log(directories.length)
    switch (directories.length){
        case 2:
            if (!hashmap["/"][directories[1]]){
            hashmap["/"][directories[1]] = {}
            break
        }
        case 3:
            if(!hashmap["/"][directories[1]][directories[2]]){
            hashmap["/"][directories[1]][directories[2]] = {}
            break;
        }
        case 4:
            if(!hashmap["/"][directories[1]][directories[2]][directories[3]]){
            hashmap["/"][directories[1]][directories[2]][directories[3]] = {}
            break;
        }
        case 5:
            // if(!hashmap["/"][directories[1]][directories[2]]){
            hashmap["/"][directories[1]][directories[2]][directories[3]][directories[4]] = {}
            break;
        // }
        case 6:
            // if(!hashmap["/"][directories[1]][directories[2]]){
            hashmap["/"][directories[1]][directories[2]][directories[3]][directories[4]][directories[5]]= {}
            break;
        // }
        case 7:
            // if(!hashmap["/"][directories[1]][directories[2]]){
            hashmap["/"][directories[1]][directories[2]][directories[3]][directories[4]][directories[5]][directories[6]]= {}
            break;
        // }

    }
}

const allLengs = new Set()

//very bad way I know * 2
function determinePath(directories: Array<string>, hashmap:any, rhs:string, lhs:string){
    switch (directories.length){
        case 1:
             hashmap["/"][rhs] = +lhs
             break
        case 2:
             hashmap["/"][directories[1]][rhs] = +lhs
             break
        case 3:
             hashmap["/"][directories[1]][directories[2]][rhs] = +lhs
             break;
        case 4:
             hashmap["/"][directories[1]][directories[2]][directories[3]][rhs] = +lhs
             break;
        case 5:
             hashmap["/"][directories[1]][directories[2]][directories[3]][directories[4]][rhs] = +lhs
             break;
        case 6:
             hashmap["/"][directories[1]][directories[2]][directories[3]][directories[4]][directories[5]][rhs] = +lhs
             break;
        case 7:
             hashmap["/"][directories[1]][directories[2]][directories[3]][directories[4]][directories[5]][directories[6]][rhs] = +lhs
             break;

    }
}


parseInput(arr)

let sum = 0
let currentDir = "/"
let directoriesSum: any= {} 
let acc = hashmap[currentDir]

let finalHash:any = {}
const duplicates: Array<number> =[]
//main logic now husshshshs

function looper(myhashmap:any ){

    let loopSum = 0
    for ( let j = 0; j < Object.values(myhashmap).length; j++){
        const key = Object.keys(myhashmap)[j]
        const val = myhashmap[key]
        if (typeof val === "object") {
            const giveme = Object.keys(val).filter(x =>  typeof val[x] === "object")
            finalHash[key] = [...giveme]
            for (let z of finalHash[key]){
                let returnSum = looper(myhashmap[key][z])
                directoriesSum[`${key}`] = returnSum
            }
        } else {
            sum+=val
            loopSum+=val
        }
    }

    return loopSum
}

looper(acc)
directoriesSum[currentDir] = sum


console.log(directoriesSum)

let sumFinal = 0

// for (let s = 0; s < Object.keys(finalHash).length; s++){
//    const items = finalHash[Object.keys(finalHash)[s]]
//    const key = Object.keys(finalHash)[s]
//    for (let item of items){
//        directoriesSum[`${key}_${item}`] += directoriesSum[item]
//    }
// }


for (let ff in directoriesSum){
    if(directoriesSum[ff] <= 100000){
        sumFinal+=directoriesSum[ff]
    }
}

// console.log(duplicates)
console.log(sumFinal)
// console.log(sumFinal + duplicates.filter(x => x <= 100000).reduce((acc,val)=> acc + val))
// const looperTwo = (dirs:any) => {
//     for (let dir in dirs){
//         if(typeof dirs[dir] === "object"){
//             const giveme = Object.keys(dirs[dir]).filter(x =>  typeof dirs[dir][x] === "object")
//             finalHash[dir] = [...giveme]
//             looperTwo(dirs[dir])
//         }
//     }
// }
//
// looperTwo(acc)

