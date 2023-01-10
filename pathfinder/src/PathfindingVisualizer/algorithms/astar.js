/* The A star algorithm is an algorithm that is quite similar to 
Dijkstra's algorithm in the method of traversal in the sense that it is a weighted algorithm
that assigns weights to it's neighbouring members the only difference is that there is an estimate called the 
heuristic distance which is the weight assigned to each neighboring node. There are three ways to calculate the heuristic distance
this depends upon the method of traversal and the number of neighbours taken into account.
Within this section the manhattan distance would be used to evaluate the heuristic distance since we will only be considering four neighbors adjacent to each node.
*/

// This function export the output related to the Astar algorithm to the pathfinding visualizer jsx file.
export function Astar(grid,startNode,finishNode){
    // Creating an open list 
    let unvisitedNodes = [];
    // Creating a closed list
    let visitedNodesInOrder = [];
    // Setting the distance of the start node as 0
    startNode.distance = 0;
    // Pushing the start node into the open list
    unvisitedNodes.push(startNode);
    // 
}

// Creating a function to obtain the neighbors of each node
function getNeighbors(node,grid)
{
    let neighbors = [];
    let {row, col} = node;
    // If the node is not present in the last column of the grid
    if (col !== grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    // If the node is not present in the last row of the grid
    if (row !== grid.length - 1) neighbors.push(grid[row + 1][col]);
    // If the node is not present in the first column of the grid
    if (col !== 0) neighbors.push(grid[row][col - 1]);
    // IF the node is not present in the first row of the grid
    if (row !== 0) neighbors.push(grid[row - 1][col]);
    // Filter the neighbors array out to remove the nodes which are walls and visited neighbors
    return neighbors.filter(
        (neighbor) => !neighbor.isWall && !neighbor.isVisited
    );
}
// end of function getNeighbors


// Function to figure out whether a neighbor in a node is an unvisited Node
function neighborNotInUnvisitedNodes(neighbor, unvisitedNodes){
    for (let node of unvisitedNodes){
        if(node.row === neighbor.row && node.col === neighbor.col)
        {
            return false;
        }
        return true;
    }
}

// Creating a function to calculate the manhattan distance
function manhattenDistance(node, finishNode)
{
    let x = Math.abs(node.row - finishNode.row);
    let y = Math.abs(node.col - finishNode.col);
    // Returning the heuristic distance
    return x + y;
}








// Creating a function to equate the manhattan distance 

