//create an array for the trail
let trail = []

function setup() {
  createCanvas(600, 600);
  fill(0)
  noStroke()
}

function draw() {
  background(255);
  
  //adds a vector to the array trail with the coords tied to the mouse position
  trail.push(createVector (mouseX, mouseY));
  
  //creates an index for every item (vector) in the array
  for (let i = 0; i < trail.length; i++) {
    const curr = trail[i];        //gets the vector at the specific index
    circle(curr.x, curr.y, i)     //creates a circle at coords of the vector and makes the diameter tied to the size of the index
  }
  
  
  
  //removes the vector at the beginning of the array whenever the array length reaches greater than 65
  if (trail.length > 65) {
    trail.shift ();
  }
  
  //user instructions
  push()
  fill(0)
  textAlign(CENTER)
  textSize(18)
  textStyle(BOLD)
  textFont('Courier New')
  text('Press your Mouse Button to change Mouse Trail Colors', 300, 45)
  pop()
}

//changes the mouse trail's color randomly everytime a mouse button is pressed
function mousePressed() {
  fill(random(255),random(255),random(255),trail.length)
}