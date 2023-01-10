
// Function to do the breadth first search of the grid
export function BFS(grid, startNode, FinishNode)
{

    

}// end of function




























// Creating a function to obtain the neighbors of the maze 
// Implementation is similar to Dikstra's algorithm
function getUnvisitedNeighbors(node, grid) {
    // Array to store the neighbors of each Visited node
    let neighbors = [];
    let {row, col} = node;
    // Defining the conditions for the different neighbors
    if (row !== 0) neighbors.push(grid[row - 1][col]);
    if (col !== grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row !== grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col !== 0) neighbors.push(grid[row][col - 1]);
    return neighbors.filter((neighbour) => !neighbour.isVisited);
}

// Function to check whether a neighbor has been visited
function neighborNotInUnvisitedNodes(neighbour, unvisitedNodes) {
    for (let node of unvisitedNodes) {
      if (node.row === neighbour.row && node.col === neighbour.col) {
        return false;
      }
    }
    return true;
}

