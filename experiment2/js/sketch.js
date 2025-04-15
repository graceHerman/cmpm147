// sketch.js - purpose and description here
// Author: Grace Herman
// Date:  04/14/25

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

// From p5.js
/* exported setup, draw */

let seed = 0;

const skyColor = "#b3e6ff";
const sunColor = "#ffff99";
const bubbleColor = "#cce6ff";
const bubbleColor2 = "#e6f7ff";
const bubbleColor3 = "#ccffff";
//const waveColor = "#1a8cff";
//const waveColor2 = "#0066cc";
//const waveColor3 = "#004080";

const waveColor = "#42c9ed";
const waveColor2 = "#1f94db";
const waveColor3 = "#0066cc";

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    // From p5.js
    createCanvas(400, 200);
    //createButton("reimagine").mousePressed(() => seed++);
    document.getElementById("reimscreen").addEventListener("click", () => {
      seed++;
    });
    
    colorMode(HSB, 360, 100, 100);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  /*background(220);    
  // call a method on the instance
  myInstance.myMethod();

  // Set up rotation for the rectangle
  push(); // Save the current drawing context
  translate(centerHorz, centerVert); // Move the origin to the rectangle's center
  rotate(frameCount / 100.0); // Rotate by frameCount to animate the rotation
  fill(234, 31, 81);
  noStroke();
  rect(-125, -125, 250, 250); // Draw the rectangle centered on the new origin
  pop(); // Restore the original drawing context

  // The text is not affected by the translate and rotate
  fill(255);
  textStyle(BOLD);
  textSize(140);
  text("p5*", centerHorz - 105, centerVert + 40);*/

  // From p5.js
  randomSeed(seed);

  background(200);
  
  noStroke();

  // Sky
  fill(skyColor);
  rect(0, 0, width, height / 2);
  
  // Generate the sun in random x positions
  fill(sunColor);
  const scrub = mouseX / width;
  let z = random();
  let sunX = width * ((random() + (scrub / 50 + millis() / 500000.0) / z) % 1);
  let sunZ = width / 13;

  circle(sunX, 55, sunZ);

  
  // waves
  drawWave(height / 4, [-10, 10], waveColor);
  drawWave(height / 2, [-5, 5], waveColor2);
  drawWave(height / 1.5, [-3, 5], waveColor3);
  
  const waveTop = height / 2 - 60;
  const scrubX = mouseY/width;

  // An array holding the colors for the bubbles
  const bubbleLayers = [
    bubbleColor,
    bubbleColor2,
    bubbleColor3
  ];
  
  const bubbleCount = 150 * random();

  // loop through color array to generate a set of bubbles for each color
  for (let c = 0; c < bubbleLayers.length; c++) {
    fill(bubbleLayers[c]);
    
    // generates the bubbles in this loop
    for (let i = 0; i < bubbleCount; i++) {
      let z = random();
      let x = random(width);
      let y = random(height, height * ((random() + (scrubX + millis() / 500000.0) / z) % 1));
      let r = random(15, 50);
      
      // make the colors of the bubble lighter as they reach the surface
      let baseC = color(bubbleLayers[c]);
      let deepBlue = color(210, 100, 80); // dark blue in HSB
      
      // this part I asked chatGPT how to make the colors lighter 
      // as they reach the surface of the waves
      // It suggested using a map
      let normalizedHeight = map(y, height, waveTop, 0.0, 1.0); // 0 = deep, 1 = top

      let currentC = lerpColor(deepBlue, baseC, constrain(normalizedHeight, 0, 1));
      fill(currentC); 

      // If bubble is still within wave bounds, draw it
      if (y + r / 2 >= waveTop) {
        ellipse(x, y, r);
      }
    }
  }

}

// Function that creates waves 
function drawWave(baseHeight, variation, color) {
  fill(color);
  beginShape();
  vertex(0, baseHeight);
  const waveSteps = 15;
  for (let i = 0; i <= waveSteps; i++) {
    let x = (width * i) / waveSteps;
    let y = baseHeight + random(variation[0], variation[1]);
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}