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

console.log(grid)

let sumEdges = 0
let maxTrees = -Infinity

for (let i = 0; i < gridSize; i++){
    for (let j = 0; j < gridSize; j++){
        if ( i === 0 || j === 0 || i === gridSize - 1 || j === gridSize -1){
            sumEdges += 1
        } else {
            traversal2(i,j)
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

    if(rowNo - 1 === 0 && upNodes[0] < no) {
        isVisible = true
        return isVisible
    } else {
        if ( upNodes.every((x:number)=> x < no) || downNodes.every((x:number) => x < no)){
            isVisible = true
            return isVisible
        }
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

    // console.log(upNodes, downNodes, no)

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

    // console.log(noOfUpTrees, noOfDownTrees, "From Node", no)

    return noOfDownTrees * noOfUpTrees


    // if(rowNo - 1 === 0 && upNodes[0] < no) {
    //     isVisible = true
    //     return isVisible
    // } else {
    //     if ( upNodes.every((x:number)=> x < no) || downNodes.every((x:number) => x < no)){
    //         isVisible = true
    //         return isVisible
    //     }
    // }
}

function traverseRow(rowNo:number, colNo:number, no:number){
    const leftNodes: any = []
    const rightNodes: any = []
    let isVisible:boolean = false
    for (let i = 0; i < gridSize; i++){
        if ( i !== colNo ){
            // console.log(arr[rowNo][i], `Traversing row for ${rowNo} ${colNo}`)
            if ( i < colNo){
                leftNodes.push(+arr[rowNo][i])
            } else {
                rightNodes.push(+arr[rowNo][i])
            }
        }
    }
    // console.log(rowNo,colNo, leftNodes, rightNodes, no)
    if(colNo - 1 === 0 && leftNodes[0] < no) {
        isVisible = true
        return isVisible
    } else {
        if ( leftNodes.every((x:number)=> x < no ) || rightNodes.every((x:number) => x < no)){
            isVisible = true
            return isVisible
        }
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
    // console.log(rowNo,colNo, leftNodes, rightNodes, no)
    for (let left of leftNodes.reverse()){
        // console.log("Left node", left, no)
        if (left >= no){
            noOfLeftTrees+=1
            break
        }
        else if (left < no){
            noOfLeftTrees+=1
        }
    }
    for (let right of rightNodes){
        // console.log("Right node", right, no)
        if (right >= no){
            noOfRightTrees+=1
            break
        }
        else if (right < no){
            noOfRightTrees+=1
        }
    }

    // console.log(noOfLeftTrees, noOfRightTrees,"From Node",  no)
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

    // console.log(colTrees, rowTrees, no, rowNo, colNo)

    maxTrees = Math.max(colTrees * rowTrees, maxTrees)
}


console.log(maxTrees)
