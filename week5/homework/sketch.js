let stars = []
let showText = 0
let textX = 0

function setup() {
  let myCanvas = createCanvas(1000, 1000);
  myCanvas.parent("sketchHolder");
  colorMode(HSB, TWO_PI, 1, 1);

  setInterval(function () {showText += 1;}, 1000); 
  
  setInterval(function () {generateStars();}, 2000);
}

function generateStars() {
  stars = [];
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      opacity: random(0.1, 0.9)
    });
  }
}

function draw() {
  background(0, 0, 0);
  push();
  for (let j of stars) {
    fill(color(0, 0, 1), j.opacity);
    ellipse(j.x, j.y, 3, 3);
  }
  pop();

  push();
  fill(0.4, 0.8, 0.8);
  translate(width * 0.5, height * 0.5);
  let diameter = 500;
  let planetRadius = 50;
  let Angle = millis() * 0.001;
  rotate(Angle);
  ellipse(diameter / 2, 0, planetRadius * 2, planetRadius * 2);
  pop();

  if (showText % 2 == 0) {
    fill(0, 0, 1);
    textSize(32);
    console.log(textX)
    text('Spaceman', textX, height * 0.5);
    
    if (textX >= width - textWidth('Spaceman')) {
      textDirection = -2; 
    } else if (textX <= 0) {
      textDirection = 2; 
    }
    
    textX += textDirection;
  }
}
