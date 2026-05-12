let dots = []
let spread = 5
let q = -1
let w = 1
let e = -1
let r = 1

function setup() {
  createCanvas(1000, 1000);
  noStroke()
  background(0);
}

function draw() {
  
  if(mouseIsPressed){
    dots.push({
      pos: createVector(mouseX,mouseY),
      initialFrame: frameCount
    })
  }
  
  for(i=0; i<dots.length; i++){
    const current = dots[i]
    
    if (keyIsDown(32)) {
      current.pos.x += spread*random(q,w)
      current.pos.y += spread*random(e,r)
    }
    
    let g = frameCount - current.initialFrame
    
    let t = constrain(g/800,0,1)
    
    let c1 = color(255)   
    let c2 = color(0)   
    let c = lerpColor(c1, c2, t)
    
    
    fill(c)
    ellipse(current.pos.x,current.pos.y,5)
  }
  textAlign(CENTER)
  fill(255,255,0)
  textSize(18)
  text("Use your mouse to draw",width/2, 960)
  textSize(15)
  text("Use WASD to change the direction of the spread, press SPACEBAR to Spread", width/2, 980)
  
  print(dots)
}

function keyPressed() {
  let keyMap = {
    'w': [-1,1,-1.5,1],
    'a': [-1.5,1,-1,1],
    's': [-1,1,-1,1.5],
    'd': [-1,1.5,-1,1],
  }
   if(keyMap[key]) {
      [q, w, e, r] = keyMap[key]
    }
}