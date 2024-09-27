let bigBertha;
let meanies = [];
let bullets = [];
let score = 0;

function setup() {
  createCanvas(600, 600);

  bigBertha = new Gun(width / 2, height - 50);
  generateMeanie(); 
}

function generateMeanie() {
  meanies.push(new Target()); 
}

function draw() {
  background(255);

  bigBertha.display();

  for (let i = meanies.length - 1; i >= 0; i--) {
    let meanie = meanies[i];
    meanie.move();
    meanie.display();

    if (bullets.length > 0) {
      for (let j = bullets.length - 1; j >= 0; j--) {
        let bullet = bullets[j];

        bullet.move();
        bullet.display();

        if (bullet.hit(meanie)) {
          score++;
          bullets.splice(j, 1);
          meanies.splice(i, 1); 
          generateMeanie(); 
        }
      }
    }
  }

  fill(0);
  textSize(32);
  text("Bullets left: " + bigBertha.currentBullet, 20, 30);
  text("Score: " + score, width - 120, 30);
}

function mouseMoved() {
  let angle = atan2(mouseY - bigBertha.y, mouseX - bigBertha.x);
  bigBertha.turnTo(angle);
}

function mousePressed() {
  if (bigBertha.currentBullet > 0) {
    bullets.push(bigBertha.shoot());
  }
}

function keyPressed() {
  if (keyCode === 82) {
    bigBertha.reload();
  }
}

class Gun {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.currentBullet = 10;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(100);
    rect(-20, -10, 40, 20);
    pop();
  }

  turnTo(targetAngle) {
    this.angle = targetAngle;
  }

  shoot() {
    this.currentBullet--;
    return new Bullet(this.x, this.y, this.angle);
  }

  reload() {
    this.currentBullet = 10; 
  }
}

class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 5;
  }

  move() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
  }

  display() {
    ellipse(this.x, this.y, 10, 10);
  }

  hit(target) {
    let d = dist(this.x, this.y, target.x, target.y);
    return d < target.size / 2;
  }
}

class Target {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 30;
    this.speedX = random(2, 4);
    this.speedY = random(2, 4);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    
    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
