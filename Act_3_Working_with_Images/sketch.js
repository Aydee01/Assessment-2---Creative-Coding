//The Intention of this was to show molds everntually growing on the image but it doesn't really translate as well as I thought

let img;

//Preloads the image file
function preload() {
  img = loadImage("panteramaniet.jpg")
}

function setup() {
  createCanvas(400, 400);
  
  //clips the mask from the canvas
  clip(mask)
  
  //loads the image file
  image(img, 0, 0, 400, 400);
}

//Creates the mask shape
function mask() {
  ellipse(200,200, 400)
}

//Watercolor effect
function draw() {
  noStroke();
  
  //Gets a random value in the range of the Width and Height
  //Applies it to X and Y
  let x = random(width);
  let y = random(height);
  
  fill(255,15)
  
  //Creates an ellipse at the random X and Y values, Set the diameter to a random size in the range of (7 - 50)
  ellipse(x,y, random(7,50))
  
  //The species of the  Mushroom in the image
  rect(0,200,width,45)
  fill(0)
  textAlign(CENTER)
  textSize(16)
  text("Amanita Pantherina",width/2,225)
}