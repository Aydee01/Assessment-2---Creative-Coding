  let word = "Hello There" //the word used for text
let x;                   //x position
let y;                   //y position
let speed = 2.5;         //speed that the text is travelling
let textDirectionX = 1;  //rate at which the text is moving in the x axis
let textDirectionY = 1;  //rate at which the text is moving in the y axis

// Set array of fonts to randomise to
let fonts = ['Brush Script MT','Courier New','Times New Roman','Tahoma','Verdana']

function setup() {
  createCanvas(700, 400);
  
  // Centers text in the middle
  x = width/2
  y = height/2
  
  textSize(25)
  // aligns text to top left
  textAlign(LEFT,TOP)

}

function draw() {
  background(255)
  
  // Setting up the text
  text(word, x, y)
  let txtWidth = textWidth(word)  //sets the text width 
  let txtHeight = textAscent()    //sets the text height
  
  //text physics
  x = x + (textDirectionX * speed)  //Horizontal movement
  y = y + (textDirectionY * speed)  //Vertical movement   
  
  //Edge Collision
  //Vertical collisions
  if (y + txtHeight >= height){                 //checks if text is hitting the top edge      
    textDirectionY = textDirectionY * -1;       //reverses the Y direction  
    textFont(random(fonts));                    //randomises the fonts based on the font array
    fill(random(255), random(255), random(255)) //randomises the colors 
  }
  if (y <= 0){                                  //checks if text is hitting the bottom edge
    textDirectionY = textDirectionY * -1;       
    textFont(random(fonts));                    
    fill(random(255), random(255), random(255)) 
  }
  
  //Horizontal collisions
  if (x + txtWidth >= width){                   //checks if text is hitting the right edge
    textDirectionX = textDirectionX * -1;       //reverses the X direction
    textFont(random(fonts));                    
    fill(random(255), random(255), random(255)) 
  }
  if (x <= 0){                                  //checks if text is hitting the left edge
    textDirectionX = textDirectionX * -1; 
    textFont(random(fonts)); 
    fill(random(255), random(255), random(255))
  }
}