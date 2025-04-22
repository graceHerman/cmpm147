/* exported generateGrid, drawGrid */
/* global placeTile */

// 
// I did chatGPT how to implement two canvases that are the same for this scenario 
// and it suggested each set (sketch.js and p2_solution.js)(sketch1.js and p2_solution1.js) have their own unique variables with their own cnvas containers
//
// 

// Overworld

function generateGrid(p, numCols, numRows) {
    let grid = [];
    //console.log("p", p);
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push("_");
      }
      grid.push(row);
    }
  
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let n = p.noise(j * 0.05, i * 0.05);
        if (n < 0.4) {
          grid[i][j] = "~";
        } else if (n < 0.6) {
          grid[i][j] = ",";
        } else {
          grid[i][j] = ".";
        }
      }
    }
  
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (grid[i][j] === ".") {
          let chance = p.random();
          if (chance < 0.055) {
            grid[i][j] = "^";
          } else if (chance < 0.13) {
            grid[i][j] = "*";
          }
        }
      }
    }
  
    return grid;
  }
  
  /*
  If location i,j is inside the grid (not out of bounds), does grid[i][j]==target? 
  Otherise, return false.
  */
  function gridCheck(grid, i, j, target) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
      return false;
    }
    return grid[i][j] == target;
  }
  
  /*
  Form a 4-bit code using gridCheck on the north/south/east/west neighbors of i,j 
  for the target code. 
  You might us an example like (northBit<<0)+(southBit<<1)+(eastBit<<2)+(westBit<<3).
  */
  function gridCode(grid, i, j, target) {
    let north = gridCheck(grid, i, j-1, target);
    let south = gridCheck(grid, i, j+1, target);
    let east = gridCheck(grid, i+1, j, target);
    let west = gridCheck(grid, i-1, j, target);

    return (north << 0) + (south << 1) + (east << 2) + (west << 3);
  }

  /*
  Get the code for this location and target. 
  Use the code as an array index to get a pair of tile offset numbers. 
  const [tiOffset, tjOffset] = lookup[code]; 
  placeTile(i, j, ti + tiOffset, tj + tjOffset);
  */
  function drawContext(grid, i, j, target, dti, dtj) {
    const code = gridCode(grid, i, j, target);
    const [tiOffset, tjOffset] = lookup[code];
    placeTile(i, j, dti + tiOffset, dtj + tjOffset);
  }

  /*
  A global variable referring to an array of 16 elements. 
  Fill this with hand-typed tile offset pairs, e.g. [2,1], 
  so that drawContext does not need to handle any special cases.
  */
  // I did ask a classmate, Gabe Ahrens to see his lookup and this is what he had
  // credit goes to him Gabe Ahrens 
  const lookup = [
    [1,1],
    [0,1],
    [2,1],
    [0,1],
    [1,2], 
    [0,2],
    [2,2],
    [0,0], 
    [1,0],
    [0,0],
    [2,0],
    [0,0],
    [1,0],
    [0,0], 
    [0,0],
    [0,0], 
  ];
  
  
  function drawGrid(p, grid) {
    p.background(128);
  
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        // plains
        if (gridCheck(grid, i, j, ",")) {
          placeTile(i, j, p.floor(p.random(1.15)), 6);
        }
        
        // water
        else if (gridCheck(grid, i, j, "~")) {
          placeTile(i, j, p.floor(p.random(2)), 16);
          drawContext(grid, i, j, ",", 9, 6);
          
          let t = p.millis() / 1000;
          let bubbleChance = p.noise(i * 0.3, j * 0.3, t * 0.2);
          if (bubbleChance > 0.6) {
            placeTile(i, j, 1, 16);
          }
        }
      
        // grass
        else if (gridCheck(grid, i, j, ".")) {
          placeTile(i, j, 1, 7);
          drawContext(grid, i, j, ".", 5, 6);
        }
        
        // trees
        else if (gridCheck(grid, i, j, "*")) {
          placeTile(i, j, 1, 7);
          placeTile(i, j, 15, 7);
        }
        
        // houses
        else {
          placeTile(i, j, p.random(1), 7);
          placeTile(i, j, 26, 3);
        }
        
      }
    }
  }
  