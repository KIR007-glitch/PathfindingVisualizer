/* The A star algorithm is an algorithm that is quite similar to 
Dijkstra's algorithm in the method of traversal in the sense that it is a weighted algorithm
that assigns weights to it's neighbouring members the only difference is that there is an estimate called the 
heuristic distance which is the weight assigned to each neighboring node. There are three ways to calculate the heuristic distance
this depends upon the method of traversal and the number of neighbours taken into account.
Within this section the manhattan distance would be used to evaluate the heuristic distance since we will only be considering four neighbors adjacent to each node.
*/
export function Astar(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
      return false;
    }
    let unvisitedNodes = []; //open list
    let visitedNodesInOrder = []; //closed list
    startNode.distance = 0;
    unvisitedNodes.push(startNode);
  
    while (unvisitedNodes.length !== 0) {
      unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
      let closestNode = unvisitedNodes.shift();
      if (closestNode === finishNode) return visitedNodesInOrder;
  
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
  
      let neighbours = getNeighbours(closestNode, grid);
      for (let neighbour of neighbours) {
        let distance = closestNode.distance + 1;
        //f(n) = g(n) + h(n)
        if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes)) {
          unvisitedNodes.unshift(neighbour);
          neighbour.distance = distance;
          neighbour.totalDistance =
            distance + manhattenDistance(neighbour, finishNode);
          neighbour.previousNode = closestNode;
        } else if (distance < neighbour.distance) {
          neighbour.distance = distance;
          neighbour.totalDistance =
            distance + manhattenDistance(neighbour, finishNode);
          neighbour.previousNode = closestNode;
        }
      }
    }
    return visitedNodesInOrder;
  }
  
  // Creating a function to obtain the neighbors of each node
  function getNeighbours(node, grid) {
    let neighbours = [];
    let { row, col } = node;
    // If the node is not present in the last column of the grid
    if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    // If the node is not present in the last row of the grid
    if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
    // If the node is not present in the first column of the grid
    if (col !== 0) neighbours.push(grid[row][col - 1]);
    // If the node is not present in the first row of the grid
    if (row !== 0) neighbours.push(grid[row - 1][col]);
    // Filter the neighboring nodes that are invalid (such as walls of the maze and already visited nodes)
    return neighbours.filter(
      (neighbour) => !neighbour.isWall && !neighbour.isVisited
    );
  }
  
  // Function to check whether the neighboring node has already been visited
  function neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes) {
    for (let node of unvisitedNodes) {
      if (node.row === neighbour.row && node.col === neighbour.col) {
        return false;
      }
    }
    return true;
  }
  
  // Heuristic distance for this method of the astar algorithm
  function manhattenDistance(node, finishNode) {
    let x = Math.abs(node.row - finishNode.row);
    let y = Math.abs(node.col - finishNode.col);
    // Returning the heuristic distance (manhatten distance)
    return x + y;
  }
  

