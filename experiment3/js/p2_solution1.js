/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGrid1(p, numCols, numRows) {
    let grid = [];
    console.log("p", p);
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push("_");
      }
      grid.push(row);
    }
    
    // Store room centers to connect with hallways
    let roomCenters = [];
  
    // Make 3 rooms
    for (let r = 0; r < 3; r++) {
      let roomWidth = p.floor(p.random(4, 8));
      let roomHeight = p.floor(p.random(4, 8));
  
      let startCol = p.floor(p.random(1, numCols - roomWidth - 1));
      let startRow = p.floor(p.random(1, numRows - roomHeight - 1));
  
      // Fill the room with "."
      for (let row = startRow; row < startRow + roomHeight; row++) {
        for (let col = startCol; col < startCol + roomWidth; col++) {
          grid[row][col] = ".";
        }
      }
  
      // Save center of the room
      let centerRow = Math.floor(startRow + roomHeight / 2);
      let centerCol = Math.floor(startCol + roomWidth / 2);
      roomCenters.push([centerRow, centerCol]);
      
      // Place chests ("*") in the room
      for (let row = startRow; row < startRow + roomHeight; row++) {
        for (let col = startCol; col < startCol + roomWidth; col++) {
          if (grid[row][col] === ".") { 
            let chance = p.random();
            if (chance < 0.015) { 
              grid[row][col] = "*";  // Place a chest
            }
          }
        }
      }
  
      // If not the first room, connect it to the previous room
      if (roomCenters.length > 1) {
        let [prevRow, prevCol] = roomCenters[roomCenters.length - 2];
  
        // Connect with horizontal then vertical hallway
        let [curRow, curCol] = [centerRow, centerCol];
  
        // Horizontal hallway
        for (let c = Math.min(prevCol, curCol); c <= Math.max(prevCol, curCol); c++) {
          if (grid[prevRow][c] === "_") {
            grid[prevRow][c] = "=";
          }
        }
  
        // Vertical hallway
        for (let r = Math.min(prevRow, curRow); r <= Math.max(prevRow, curRow); r++) {
          if (grid[r][curCol] === "_") {
            grid[r][curCol] = "=";
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
  function gridCheck1(grid, i, j, target) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
      return false;
    }
    return grid[i][j] === target;
  }
  
  /*
  Form a 4-bit code using gridCheck on the north/south/east/west neighbors of i,j 
  for the target code. 
  You might us an example like (northBit<<0)+(southBit<<1)+(eastBit<<2)+(westBit<<3).
  */
  function gridCode1(grid, i, j, target) {
    let north = gridCheck1(grid, i - 1, j, target) ? 1 : 0;
    let south = gridCheck1(grid, i + 1, j, target) ? 1 : 0;
    let east = gridCheck1(grid, i, j + 1, target) ? 1 : 0;
    let west = gridCheck1(grid, i, j - 1, target) ? 1 : 0;
  
    return (north << 0) + (south << 1) + (east << 2) + (west << 3);
  }
  
  /*
  Get the code for this location and target. 
  Use the code as an array index to get a pair of tile offset numbers. 
  const [tiOffset, tjOffset] = lookup[code]; 
  placeTile(i, j, ti + tiOffset, tj + tjOffset);
  */
  function drawContext1(grid, i, j, target, dti, dtj) {
    const code = gridCode1(grid, i, j, target);
    const offset = lookup1[code];
  
    if (offset !== null) {
      const [tiOffset, tjOffset] = offset;
      placeTile1(i, j, dti + tiOffset, dtj + tjOffset);
    }
  }
  
  /*
  A global variable referring to an array of 16 elements. 
  Fill this with hand-typed tile offset pairs, e.g. [2,1], 
  so that drawContext does not need to handle any special cases.
  */
  const lookup1 = [
    [0,0], // 0000 - no neighbors
    [1,0], // 0001 - north
    [2,0], // 0010 - south
    [3,0], // 0011 - north + south
    [0,1], // 0100 - east
    [1,1], // 0101 - north + east
    [2,1], // 0110 - south + east
    [3,1], // 0111 - north + south + east
    [0,2], // 1000 - west
    [1,2], // 1001 - north + west
    [2,2], // 1010 - south + west
    [3,2], // 1011 - north + south + west
    [0,3], // 1100 - east + west
    [1,3], // 1101 - north + east + west
    [2,3], // 1110 - south + east + west
    [3,3], // 1111 - all four
  ];
  
  
  function drawGrid1(p, grid) {
    p.background(128);
    console.log("in p2_solution1.js");
  
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        
        // room
        if (gridCheck1(grid, i, j, ".")) {
          placeTile1(i, j, p.floor(p.random(0, 2)), 10);
        }
        
        // hallway
        else if (gridCheck1(grid, i, j, "=")) {
          placeTile1(i, j, p.floor(p.random(2)), 10);
        }
        
        // chests
        else if (gridCheck1(grid, i, j, "*")) {
          placeTile1(i, j, 5, 30);
        }
        
        // background
        else  {
          placeTile1(i, j, p.floor(p.random(2)), 9);
          //drawContext(grid, i, j, ".", 9, 9);
          drawContext1(grid, i, j, ".", 12, 9);
        }
        
      }
    }
  }