function isValidMove(grid, visited, row, col) {
    let rows = grid.length;
    let cols = grid[0].length;
    return row >= 0 && row < rows && col >= 0 && col < cols && !visited[row][col] && (grid[row][col] === 4 || grid[row][col] === 0);
}

function dfs(grid, visited, row, col, path, paths) {
    if (grid[row][col] === 0) {
        paths.push([...path]);
        return;
    }
    visited[row][col] = true;

    let moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    for (let move of moves) {
        let newRow = row + move[0];
        let newCol = col + move[1];
        if (isValidMove(grid, visited, newRow, newCol)) {
            path.push([newRow, newCol]);
            dfs(grid, visited, newRow, newCol, path, paths);
            path.pop();
        }
    }

    visited[row][col] = false;
}

function findPaths(grid, startRow, startCol) {
    let rows = grid.length;
    let cols = grid[0].length;
    let visited = new Array(rows).fill(0).map(() => new Array(cols).fill(false));
    let paths = [];
    let path = [[startRow, startCol]];

    dfs(grid, visited, startRow, startCol, path, paths);

    return paths;
}

let grid = [
    [4, 4, 2, 5, 5, 5, 5],
    [5, 2, 2, 2, 5, 5, 5],
    [5, 5, 4, 4, 5, 5, 5],
    [5, 5, 4, 4, 4, 5, 5],
    [5, 5, 4, 5, 4, 0, 5],
    [5, 5, 4, 5, 5, 5, 5],
    [5, 0, 0, 5, 0, 5, 5],
    [5, 0, 0, 0, 4, 5, 5]
];
let commercialRow = 1;
let commercialCol = 2;

let paths = findPaths(grid, commercialRow, commercialCol);

console.log("Paths from commercial area to residence:");
for (let path of paths) {
    console.log(path.map(point => (${point[0]}, ${point[1]})).join(" "));
}
console.log(paths.length);

