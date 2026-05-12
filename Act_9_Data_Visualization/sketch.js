let teams = [];
let wins = [];
let barWidths = [];

let speed = 1;

function preload() {
  data = loadTable('Nba Finals Wins.csv', 'csv', 'header');
}

function setup() {
  createCanvas(680, 700);
  
  //get the column data at the string values
  teams = data.getColumn("Teams");
  wins = data.getColumn("Wins");

  //Set all Bar Widths to zero to be able to animated  
  for (let i = 0; i < teams.length; i++) {
    barWidths[i] = 0;
  }

  textSize(12);
}

function draw() {
  background(220);

  let barHeight = 20;
  let spacing = 10;

  for (let i = 0; i < teams.length; i++) {

    let y = 30 + i * (barHeight + spacing);

    //Get the wins data and convert it to an integer
    let w = int(wins[i]);

    //Scale the bar larger than the value for a better display
    let targetWidth = w * 20;

    //Animate the icnrease in value of wins by each team
    if (barWidths[i] < targetWidth) {
      barWidths[i] += speed;
    }

    // Team name
    fill(0);
    text(teams[i], 10, y + 15);

    // Bar
    fill("#c98f08");
    rect(250, y, barWidths[i], barHeight);

    // Wins text
    fill(0);
    text(w, 260 + targetWidth, y + 15);
    
    push()
    textSize(20)
    textAlign(CENTER)
    text("Championship wins by NBA Teams", width/2, 685)
    pop()
  }
}