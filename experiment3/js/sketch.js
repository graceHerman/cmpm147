// sketch.js - purpose and description here
// Author: Grace Herman
// Date: 04/20/25

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// 
// I did chatGPT how to implement two canvases that are the same for this scenario 
// and it suggested each set (sketch.js and p2_solution.js)(sketch1.js and p2_solution1.js) have their own unique variables with their own cnvas containers
// For the sketch files, they should integrate a p5.js reference which is "p"
// 

// From glitch
/* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

let s1 = function (p) {
  let seed = 0;
  let tilesetImage;
  let currentGrid = [];
  let numRows, numCols;

  p.preload = function () {
    tilesetImage = p.loadImage(
      "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
    );
  };

  function reseed() {
    seed = (seed | 0) + 1;
    p.randomSeed(seed);
    p.noiseSeed(seed);
    p.select("#seedReport").html("seed " + seed);
    regenerateGrid();
  }

  function regenerateGrid() {
    p.select("#asciiBox").value(gridToString(generateGrid(p, numCols, numRows)));
    reparseGrid();
  }

  function reparseGrid() {
    currentGrid = stringToGrid(p.select("#asciiBox").value());
  }

  function gridToString(grid) {
    return grid.map(row => row.join("")).join("\n");
  }

  function stringToGrid(str) {
    return str.split("\n").map(line => line.split(""));
  }

  p.setup = function () {
    numCols = p.select("#asciiBox").attribute("rows") | 0;
    numRows = p.select("#asciiBox").attribute("cols") | 0;

    let cnv = p.createCanvas(16 * numCols, 16 * numRows);
    cnv.parent("canvasContainer");
    cnv.elt.getContext("2d").imageSmoothingEnabled = false;

    p.select("#reseedButton").mousePressed(reseed);
    p.select("#asciiBox").input(reparseGrid);

    reseed();
  };

  p.draw = function () {
    p.randomSeed(seed);
    drawGrid(p, currentGrid);
  };

  function placeTile(i, j, ti, tj) {
    p.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
  }
  window.placeTile = placeTile;
};

new p5(s1);


