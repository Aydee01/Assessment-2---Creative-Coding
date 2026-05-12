function setup() {
  createCanvas(400, 400);
  //Mask to make a circle canvas
  clip(mask)
}

function mask() {
  ellipse(200,200, 400)
}

function draw() {  
  //set a variable to add gaps between shapes
  let space = 25;
  background(225);
  rectMode(CENTER);

  //for loop to create a grid 
  for (let x = 0; x < width + 20; x += space) {
    for (let y = 0; y < height + 20; y += space) {
      
      // Distance from mouse
      let d = dist(x, y, mouseX, mouseY);
      
      // Map distance to the size of each shape 
      let a = map(d, 0, 150, 20, 5, true);
      
      // Map closest shape to the mouse with a value of 255 and and the furthest (200px) with 0
      let c = map(d, 0,200, 255,0 )
      
      push()
      noStroke()
      fill(c,0,0)
      square(x, y, a);
      ellipse(x + space/2, y + space/2, a);
      pop()
    }
  }
}
