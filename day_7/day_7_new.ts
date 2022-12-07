const { readInput } = require('./utility.ts')
const arr = readInput("./day7_prod.txt")


const part1 = () => {
    let directories:any = { '/': { parent: '', files: [], directories: [] } };

    let currentDirectory = '';
    arr.forEach((line:any )=> {
        let tokens = line.split(' ');
        if (line.startsWith('$')) {
            if (tokens[1] == 'cd') {
                if (tokens[2] == '/') {
                    currentDirectory = '/';
                } else if (tokens[2] == '..') {
                    let paths = currentDirectory.split('/');
                    currentDirectory = paths.slice(0, paths.length - 1).join('/');
                } else {
                    currentDirectory = (currentDirectory == '/' ? currentDirectory : currentDirectory + '/') + tokens[2];
                }
            }
        } else {
            if (tokens[0] == 'dir') {
                let newDirectory = (currentDirectory == '/' ? currentDirectory : currentDirectory + '/') + tokens[1];
                directories[newDirectory] = {
                    parent: currentDirectory,
                    files: [],
                    directories: []
                }

                directories[currentDirectory].directories.push(newDirectory);
            } else {
                directories[currentDirectory].files.push({ file: tokens[1], size: parseInt(tokens[1]) });
            }
        }
    });

    let calculateSize = (directory:any) => {
        return directories[directory].files.reduce((acc:any, file:any) => acc + file.size, 0) +
               directories[directory].directories.reduce((acc:any, child:any) => acc + calculateSize(child), 0);
    }
    
    return Object.keys(directories).reduce((acc, key) => {
        let total = calculateSize(key);
        if (total <= 100000) acc += total;
        return acc;
    }, 0);
}

console.log(part1())
