let song;
let fft;
let spectrum = [];

//Preload's mp3 file
function preload() {
  song = loadSound("music.mp3")
}

function setup() {
  createCanvas(550, 400);
  //Plays mp3 file
  song.play();
  
  //Fast Fourier Transform
  //Puts the FFT Analysis Algorithm in a variable to be able to use it
  fft = new p5.FFT(0.8, 1024); 
  textAlign(CENTER)
}

function draw() {
  
  background(0);
  
  //The FFt.analyze returns a array of amplitudes across a Frequency Range
  spectrum = fft.analyze();
  
  //Gets the amplitude at a specific frequcny range
  let t = fft.getEnergy("treble")
  let hm = fft.getEnergy("highMid")
  let m = fft.getEnergy("mid")
  let lm = fft.getEnergy("lowMid")
  let b = fft.getEnergy("bass")
  
  //Maps the range of Amplitude from (0,255) to (5,100)
  let td = map(t, 0,255, 5,100)
  let hmd = map(hm, 0,255, 5,100)
  let md = map(m, 0,255, 5, 100)
  let lmd = map(lm, 0,255, 5,100)
  let bd = map(b, 0,255, 5, 100)
  
  //Audio Visualizers showing the amplitude of each Frequency Range
  if (t > 1){
    fill(255,255,0) //yello
    ellipse(475, 200,td)
  }
  if (hm > 50){
    fill(255,0,255) //magenta 
    ellipse(375, 200,hmd)
  }
  if (m > 50){
    fill(0,255,0) //green
    ellipse(275, 200,md)
  }
  if (lm > 150){
    fill(0,255,255) //cyan
    ellipse(175, 200,lmd)
  }
  if (b > 200){
    fill(255) //black
    ellipse(75, 200,50)
  }
  
  //Frequency Domain Graph
  for (let i=0; i<spectrum.length; i++) {
    let y = map(spectrum[i], 0, 255, 0, height/2);
    push()
    stroke(255)
    line(i, height, i, height - y);
    pop()  
  }
  
  push()
  //Frequency Ranges
  fill(255)
  textSize(25)
  text('Bass', 75, 125)
  text('Low Mids', 175, 125)
  text('Mids', 275, 125)
  text('High Mids', 375, 125)
  text('Treble', 475, 125)
  
  //Frequency Values
  textSize(12)
  text('20 - 140 hz', 75, 150)
  text('140 - 400 hz', 175, 150)
  text('400 - 2600 hz', 275, 150)
  text('2600 - 5200 hz', 375, 150)
  text('5200+ hz', 475, 150)
  
  //Instruments Used in this song
  textSize(12)
  text('Low Frequencies', 75, 255)
  text('Bass Piano/Synth', 175, 255)
  text('Kick', 275, 255)
  text('Snare', 375, 255)
  text('Hi Hat, Cymbals', 475, 255)
  pop()
}