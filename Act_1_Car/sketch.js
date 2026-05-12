function setup() {
  createCanvas(400, 400);
}

//Puts the X position of car at the right to keep it outside of the screen
let carPosX = 400

function draw() {
  background(220);
  noStroke()
  
  //Moves the origin point to carPosX, and moves the car right
  translate(carPosX, 10)
  //If the Car is outside the screen at the left send it right
  if(carPosX < -400){
    carPosX = 400
  }
  //Else keep moving the car left by 5px
  else {
    carPosX -= 5
  }
  
  //Roof of the Car
  fill("#FFCC00")
  quad(120,200, 180,150, 300,150, 310,200)
  
  //Windows
  fill("#A3EEFF")
  quad(130,200, 182,155, 230,155, 230,200)
  quad(235,200, 235,155, 295,155, 305,200 ) 
  
  //Body of the Car
  fill("#FFCC00")
  rect(45, 200, 300, 80, 20, 5, 20, 20)
  
  //Wheels
  fill(220)            //Overlap from the body to give the wheels a better look
  ellipse(110,280,70)
  ellipse(280,280,70)
  
  fill(0)              //The Wheels Itself
  ellipse(110,280,60)
  ellipse(280,280,60)
  
  
  fill(100)            //Inner circle at the wheel to look like rims
  ellipse(110,280,30)
  ellipse(280,280,30)
}