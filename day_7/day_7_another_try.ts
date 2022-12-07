const { readInput } = require('./utility.ts')
const arr = readInput("./day7_prod.txt")

let directories: any = {"/": {parent: "", directories:[], files:[]}}
let currentDir = ""
for (let line of arr){
    //parse line here
    const splitLine = line.split(" ")
    if (splitLine[0].startsWith("$")){
        if (splitLine[1] === "cd"){
            if (splitLine[2] === "/"){
                currentDir = "/"
            } else if ( splitLine[2] === "..") {
                let paths = currentDir.split("/")
                currentDir = paths.slice(0, paths.length - 1).join("/")
            } else {
                currentDir = (currentDir === "/" ? "/": currentDir + "/") + splitLine[2]
            }

        }
    } else {
        if (splitLine[0] === "dir"){
            let newDirKey =  (currentDir === "/" ? currentDir: currentDir + "/") + splitLine[1]
            directories[newDirKey] = {parent: currentDir, files:[], directories:[]}

            directories[currentDir].directories.push(newDirKey)
        } else {
            directories[currentDir].files.push({file: splitLine[1], size: +splitLine[0]})
        }
    }
}

const calSize = (directory:any) => {
    return directories[directory].files.reduce((acc:any, val:any) => acc + val.size, 0) + 
        directories[directory].directories.reduce((acc:any,val:any) => acc + calSize(val), 0)
}

function part1(){
    return Object.keys(directories).reduce((acc:any,dir:any) => {
        let size = calSize(dir)
        if(size <= 100000) acc+=size
            return acc
    }, 0)
}
console.log(part1())

function part2(){
    const totalAv = 70000000
    const updateReq = 30000000
    const unused = 70000000 - calSize("/")

    const compare = updateReq - unused

    const allSizes = Object.keys(directories).map(x => calSize(x))

    let small = Infinity

    allSizes.forEach((val) => {
        if( val >= compare) small = Math.min(val, small)
    })

    return small

}
console.log(part2())
