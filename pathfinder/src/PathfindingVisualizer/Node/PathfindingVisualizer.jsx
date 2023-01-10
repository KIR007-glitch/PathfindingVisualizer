import React, {Component} from 'react';
import Node from './Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {Astar} from '../algorithms/astar';
import './PathfindingVisualizer.css';


const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

// Definining the number of rows and columns for the grid 
const initialNumRows = 20;
const initialNumColumns = 50;


export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      visualizingAlgorithm: false,
      width: window.innerWidth,
      height: window.innerHeight,
      numRows: initialNumRows,
      numColumns: initialNumColumns,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  // Method to animate the Dijkstra algorithm 
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`,).className;
        if(
          nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish')
        {document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }
      }, 10 * i);
    }
  }
  
// Method to retrieve the nodes within the shortest path
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`,).className;
        if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish')
        {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
        }
      }, 50 * i);
    }
  }

  // Setting up a method to visualize Dijkstra's algorithm
  visualizeDijkstra(){
    const{grid} = this.state;
    // Defining the start node 
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    // Declaring the finish node 
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    //  Visualizing all the visited nodes on the grid
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    //  Constructing the shortest path and then visualizing it on the grid
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    // Animating the visited nodes and the shortest path in Djikstra's algorithm
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }


//////////////////////////////// Visualizing the A star algorithm///////////////////////////////////////////////////
  //Setting up a method to visualize A star algorithm
  visualizeAstar(){
    const{grid} = this.state;
    // Defining the start node 
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    // Defining the finish node
     const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    // Visualizing all the visited nodes on the grid
    const visitedNodesInOrder = Astar(grid,startNode,finishNode)
    // Constructing the shortest path and then visualizing it on the grid
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    // Animating the visited nodes and the shortest path in Astar
    this.animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder);
  }


  



  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <div>
        <button onClick = {() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick = {() => this.visualizeAstar()}>
          Visualize Astar's Algorithm
        </button>
        
        
        <table
          className="grid-container"
          onMouseLeave={() => this.handleMouseLeave()}>
          <tbody className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {row, col, isFinish, isStart, isWall} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp(row, col)}
                        row={row}></Node>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}


// Creating the initial grid 
// Make sure to update the variables using the initial number of columns and rows
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 25; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

// 
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};






