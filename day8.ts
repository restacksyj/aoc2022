const { readInput } = require('./utility.ts')
const arr = readInput("./day8_prod.txt")

const gridSize = arr.length
//some observations

// a node is an edge if its right is null or left is null
//
// 1,1 -> {0,1}, {2,1}, {3,1}, {4,1} | {1,0}, {1,2}, {1,3}, {1,4}
// 2,1 -> {0,1}, {2,1}, {3,1}, {4,1} | {1,0}, {1,2}, {1,3}, {1,4}

const grid: Array<Array<number>>= []

for ( let line of arr){
    const nodes = line.split("")
    grid.push(nodes)
}

let sumEdges = 0
let maxTrees = -Infinity

for (let i = 0; i < gridSize; i++){
    for (let j = 0; j < gridSize; j++){
        if ( i === 0 || j === 0 || i === gridSize - 1 || j === gridSize -1){
            sumEdges += 1
        } else {
            traversal(i,j)
        }
    }
}

function traverseColumn(rowNo:number, colNo:number, no:number){
    const upEdgeCol = arr[0][colNo]
    const bottomEdgeCol = arr[gridSize - 1][colNo]
    let isVisible = false

    const upNodes: any = []
    const downNodes: any = []
    for (let i = 0; i < gridSize; i++){
        if ( i !== rowNo ){
            if ( i < rowNo){
                upNodes.push(+arr[i][colNo])
            } else {
                downNodes.push(+arr[i][colNo])
            }
        }
    }

    if ( upNodes.every((x:number)=> x < no) || downNodes.every((x:number) => x < no)){
        isVisible = true
        return isVisible
    }
}

function traverseColumn2(rowNo:number, colNo:number, no:number){
    const upEdgeCol = arr[0][colNo]
    const bottomEdgeCol = arr[gridSize - 1][colNo]
    let noOfUpTrees = 0
    let noOfDownTrees = 0

    const upNodes: any = []
    const downNodes: any = []
    for (let i = 0; i < gridSize; i++){
        if ( i !== rowNo ){
            if ( i < rowNo){
                upNodes.push(+arr[i][colNo])
            } else {
                downNodes.push(+arr[i][colNo])
            }
        }
    }
    // this reverse() was an epiphany at 1:30 P.M
    for (let up of upNodes.reverse()){
        if (up >= no){
            noOfUpTrees+=1
            break
        }
        else if (up < no){
            noOfUpTrees+=1
        }
    }
    for (let down of downNodes){
        if (down >= no){
            noOfDownTrees+=1
            break
        }
        else if (down < no){
            noOfDownTrees+=1
        }
    }

    return noOfDownTrees * noOfUpTrees
}

function traverseRow(rowNo:number, colNo:number, no:number){
    const leftNodes: any = []
    const rightNodes: any = []
    let isVisible:boolean = false
    for (let i = 0; i < gridSize; i++){
        if ( i !== colNo ){
            if ( i < colNo){
                leftNodes.push(+arr[rowNo][i])
            } else {
                rightNodes.push(+arr[rowNo][i])
            }
        }
    }
        if ( leftNodes.every((x:number)=> x < no ) || rightNodes.every((x:number) => x < no)){
            isVisible = true
            return isVisible
        }
}
function traverseRow2(rowNo:number, colNo:number, no:number){
    const leftNodes: any = []
    const rightNodes: any = []
    let noOfLeftTrees = 0
    let noOfRightTrees  = 0
    for (let i = 0; i < gridSize; i++){
        if ( i !== colNo ){
            if ( i < colNo){
                leftNodes.push(+arr[rowNo][i])
            } else {
                rightNodes.push(+arr[rowNo][i])
            }
        }
    }

    //Same epiphany here
    for (let left of leftNodes.reverse()){
        if (left >= no){
            noOfLeftTrees+=1
            break
        }
        else if (left < no){
            noOfLeftTrees+=1
        }
    }
    for (let right of rightNodes){
        if (right >= no){
            noOfRightTrees+=1
            break
        }
        else if (right < no){
            noOfRightTrees+=1
        }
    }
    return noOfRightTrees * noOfLeftTrees
}


function traversal(rowNo:number, colNo:number){
    const no = +arr[rowNo][colNo]
    const visibleMap:any = {}
    const rowVisible = traverseRow(rowNo, colNo, no)
    if (rowVisible) {
        sumEdges += 1
    } else {
        const colVisible  = traverseColumn(rowNo, colNo, no)
        if (colVisible) {
            sumEdges += 1
        }
    }
}

function traversal2(rowNo:number, colNo:number){
    const no = +arr[rowNo][colNo]
    let colTrees = traverseColumn2(rowNo, colNo, no)
    let rowTrees = traverseRow2(rowNo, colNo, no)
    maxTrees = Math.max(colTrees * rowTrees, maxTrees)
}


console.log(sumEdges)
console.log(maxTrees)
