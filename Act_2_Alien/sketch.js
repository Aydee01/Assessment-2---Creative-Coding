function setup() {
  createCanvas(400, 400);
  noStroke();
  //Set the origin of rects to the center
  rectMode(CENTER)
  //Set the angle mode from radians to Degrees
  angleMode(DEGREES)
}

function draw() {
  background(10, 5, 30);
  
  //Ties the X and Y coordinates to the mouse's X and Y Coordinates
  let x = mouseX;
  let y = mouseY;
  
  //Window of the UFO
  fill("#c5edea")
  rect(x,y-40,100,65, 100, 100, 0, 0)


  //Head of the Alien
  fill("#529c62")
  ellipse(x, y-40, 45, 60)

    //Body of the UFO
  fill(155)
  ellipse(x,y,200,45)
  
  //Eyes
  push()
  translate(x-10, y-45)
  rotate(-30)
  fill(0)
  ellipse(0, 0, 5, 20)
  pop()

  push()
  translate(x+10, y-45)
  rotate(30)
  fill(0)
  ellipse(0, 0, 5, 20)
  pop()    
}