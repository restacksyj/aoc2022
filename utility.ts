const fs = require('fs')

export const readInput = (path:string): Array<string> => {
    const input = fs.readFileSync(path, {encoding:'utf8', flag:'r'})
    const arr = input.split("\n")
    arr.pop()

    return arr
}
