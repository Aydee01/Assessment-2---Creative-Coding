//This game uses a song made by my friends over at Puof, this is an instrumental version of it.
//Listen to the official release of it online!
//Title: Don't love you anymore
//Spotify: https://open.spotify.com/track/4Dc6WnCqfB37zOeRhxPpLy
//Youtube: https://www.youtube.com/watch?v=YM8aRAHK4tU

let notes = []

// Lane positions
let lanes = [100, 200, 300]

let score = 0

// SONG SETTINGS  
let bpm = 90
let beatMs = 60000 / bpm

// How long notes take to reach hit line
let approachTime = 2000

// Pixels per second
let scrollSpeed = 175

//Notes are charted by beats per minute
let chart = [
  
//Intro (Cymbals)
  
  [4,0],
  [5.5,1],
  [7,2],
  
  [12,2],
  [13.5,1],
  [15,0],
  
  [20,0],
  [21.5,1],
  [23,2],
  
  [28,2],
  [29.5,1],
  [31,0],
  
//Main Riff + Synth/Piano/Horns
  
  //Guitar
  [37,0],
  [38,2],
  [38.5,2],
  [39.5,0],
  [40.5,1],
  [41.5,0],
  [42.5,2],
  [43,0],
  [43.5,1],
  
  //Horns
  [45,0],[45,1],
  
  //Guitar (Hammer-on? Not sure with Franz's composition)
  [45.5,1],
  [45.8,2],
  
  //Guitar
  [46.5,1],
  [47.5,2],
  [48.5,0],
  [49.5,1],
  
  //Piano + Horns
  [50.5,0],[50.5,1],
  [51,1],[51,2],
  [51.5,0],[51.5,2],
  
  [52,1],
  [53,0],
  [54,2],
  [54.5,1],
  
  [55.5,2],
  [56.5,1],
  [57.5,1],
  
  [58.5,0],
  [59,2],
  [59.5,0],[59.5,2],
  
  [61,1],[61,2],
  
  [61.5,0],
  [61.8,1],
  
  [62.7,0],
  [63.5,2],
  [64.5,0],
  
  [65.5,1],
  
  [66.5,0],[66.5,1],
  [67,1],[67,2],
  [67.5,0],[67.5,2],
  [68,0],
  
  [69,0],[69,2],
  [70,1],
  [70.5,0],
  [71,2],
  [71.5,0],
  [72,1],
  [72.5,2],
  [73,0],[73,2],
  [73.5,0],[73.5,2],
  [74.5,1],
  [76,0],
  [77,2],
  [78,1],
  [78.5,1],
  [79,0],
  [79.5,0],
  [80,2],
  [80.5,2],
  [81.5,0],[81.5,1],
  [82.5,1],[82.5,2],
  [84,0],[84,1],[84,2],
  [85,0],
  [86,1],[86,2],
  [86.5,2],
  [87.5,0],[87.5,1],
  [88,0],[88,2],
  [88.5,0],[88.5,1],
  [89.5,1],[89.5,2],
  [90.5,0],[90.5,1],
  [91.5,1],
  [92,0],[92,1],
  [92.5,2],
  [93,1],[93,2],
  
  [93.5,1],
  [94,0],[94,2],
  [94.5,1],
  [95,0],[95,2],

]

let noteIndex = 0

let hitLineY = 350

let song

let frameCounter = 0

let gameState = 'menu'
let hitDetect = ''

function preload() {
  song = loadSound("SDLYA.mp3")
}

function setup() {
  createCanvas(400, 400)
  console.log(song.duration())
}

function draw() {
  background(220)
  
  //Game state condition
  if(gameState == 'menu') {  
    drawMenu()
  }
  else if(gameState == 'play'){
    drawLanes()

    //Hit line (Position where the notes can only be hit)
    line(0, hitLineY, width, hitLineY)

    //Counts for how long the program has been running
    let currTime = song.currentTime() * 1000

    //Function for spawning notes gets called at the specific time it's needed
    spawnNotes(currTime)

    //Calculates the position of the note
    updateNotes(currTime)

    //Creates the UI  
    drawUI()
    
    if(song.currentTime() >= song.duration() - 0.1) {
      gameState = 'end'
    }
  }
  else{
    if(gameState == 'end'){
      drawEndScreen()
    }
  }
}

//~ ~ ~ ~ ~ GAME ENGINE FUNCTIONS ~ ~ ~ ~ ~

//Spawning Notes at specific times and retriving beat data
function spawnNotes(currTime) {
  
  //checks all the possible notes and loops
  while(noteIndex < chart.length) {
    
    //Gets the beat number from the chart
    let beat = chart[noteIndex][0]
    
    //Gets the Lane number from the chart
    let lane = chart[noteIndex][1]

    //Calculates the time the note will get hit   
    let hitTime = beat * beatMs

    //Spawns the note before the calculated hit time is reached
    let spawnTime = hitTime - approachTime

    //Checks if it's time to spawn the note
    if(currTime >= spawnTime) {
      
      //adds a note in the notes array and all the information it needs
      notes.push({
        lane: lane,      //Lane which the note spawns in
        x: lanes[lane],  //X position of the note based on the lane
        hitTime: hitTime //When should player hit the note
      })
      
      //Moves on to the next note and take the next beat data
      noteIndex++

    } else {
      break  
    }
  }
}

//Note Detection and Note Travel
function updateNotes(currTime) {

  for(let i = notes.length - 1; i >= 0; i--) {
    
    //puts the current note in variable n
    let n = notes[i]

    //Time until the note will be hit
    let timeUntilHit = n.hitTime - currTime

    //Use Seconds instead of milliseconds
    let secondsUntilHit = timeUntilHit / 1000

    //Positions where the note should spawn to reach the hitline on time, The note's movement
    n.y = hitLineY - (secondsUntilHit * scrollSpeed)

    //The Note itself
    ellipse(n.x, n.y, 20)

    //Condition for notes that pass the hitline
    if(n.y > 365) {
      
      //Removes note from the array 
      notes.splice(i,1)
      
      //Deducts points
      hitDetect = 'Miss!'
      score -= 25
      
    }
  }
}
  
function keyPressed() {
  //Sets the keybinds of the game
  let keyMap = {
    'a': 0,
    's': 1,
    'd': 2
  }
  
  //Map the keys to the appropriate lane
  let lane = keyMap[key]

  //Ignores any other key inout
  if(lane === undefined) 
    return

  //Converts current song time into milliseconds
  let currTime = song.currentTime() * 1000

  //Goes through all notes
  for(let i = notes.length - 1; i >= 0; i--) {

    //Puts each note into variable n
    let n = notes[i]

    //Checks if the note is not in the right lane the user inputted
    if(n.lane !== lane) continue

    //Calculates the difference between the time to hit the note and the elapsed time
    let timingError = abs(currTime - n.hitTime)

    //Allows for a margin of error of 150ms
    if(timingError < 150) {
      
      //clears the note
      notes.splice(i,1)
      
      //give the player points
      score += 25
      hitDetect = 'Hit!'
      
      //Prevents condition to be overan by miss detection and hit multiple notes at once
      return   
    }
  }
  
  //If player doesn't hit on time deducts points from player
  score -= 25

  hitDetect = 'Miss!'
}

//~ ~ ~ ~ ~ DESIGN FUNCTIONS ~ ~ ~ ~ ~   
  
//Simple Ui design for game
function drawUI() {

  fill(0)

  textAlign(CENTER)
  
  //Score UI
  fill("#44B49A")
  text('Your Score', 50, 20)
  textSize(24)
  text(score, 50, 45)
  
  text(hitDetect, 50,100)

  //Buttons to press
  fill(0)
  textSize(16)
  text("A",100,380)
  text("S",200,380)
  text("D",300,380)
}
  
function drawLanes() {

  push()

  fill(255,255,0,80)

  for(let x = 0; x < width; x += 100){
    rect(x,0,100,350)
  }

  pop()
} 

function drawMenu() {
  background("#E7E797");
  
  textAlign(LEFT)
  fill("#44B49A");
  textSize(36)
  text("Just Another", 40,50)
  text("Rhythm Game!", 40,80)
  
  
  fill("#44B49A");
  textSize(25);
  text("She dont love you anymore", 40, 200);
  textSize(10)
  text("By: Puof", 40, 220)

  push()
  textAlign(CENTER)
  textSize();
  fill("#CC6644");
  text("Keybinds: A S D", width / 2, 375);
  pop()
  
  push()
  if(isHovered()){
    colB = "#44B49A"
    colA = "#E7E797"
  }
  else {
    colA = "#44B49A"
    colB = "#E7E797"
  }
  
  fill(colA)
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER)
  rect(width / 2, 300, 120, 50, 8); // x, y, width, height, corner radius
 
  // Draw the label
  fill(colB);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text("PLAY", width / 2, 305);
  pop()
}

function drawEndScreen() {
  background(0)

  fill(255)
  textAlign(CENTER)
  textSize(32)
  text("Song Complete!", width / 2, 150)

  textSize(24)
  text("Final Score: " + score, width / 2, 220)
  
  push()
  if(isHovered()){
    colB = "#44B49A"
    colA = "#E7E797"
  }
  else {
    colA = "#44B49A"
    colB = "#E7E797"
  }
  
  fill(colA)
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER)
  rect(width / 2, 300, 120, 50, 8);
 
  // Draw the label
  fill(colB);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text("Retry", width / 2, 305);
  pop()
}
  
function drawFlash() {

  if(flashAlpha > 0) {

    noStroke()
    fill(flashColor[0], flashColor[1], flashColor[2], flashAlpha)
    rect(0, 0, width, height)

    // Fade out
    flashAlpha -= 10
  }
}
  
function mousePressed(){
  if(gameState == 'menu' && isHovered()){
    gameState = 'play'
    song.play()
  }
  else if(gameState == 'end' && isHovered()){
    noteIndex = 0
    notes = []
    score = 0
    
    song.stop()
    song.jump(0)

    gameState = 'menu'
  }
}

function isHovered() {
  if(mouseX > 140 && mouseX < 260 && mouseY < 325 && mouseY > 275){
    return true;
  }
  return false
}


  
