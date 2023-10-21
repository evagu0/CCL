let bigCircle;
let particles = [];
let targetX, targetY;
let easing = 0.05;
let bgColor;
let trail = [];
let trailAlpha = 10;

function setup() {
  createCanvas(400, 400);
  bigCircle = new Circle(width / 2, height / 2, 40);
  targetX = bigCircle.x;
  targetY = bigCircle.y;

  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let c = color(random(200, 255), random(200, 255), random(200, 255), 150);
    particles.push(new Particle(x, y, c));
  }
}

function draw() {
  background(182, 217, 224);

  targetX = mouseX;
  targetY = mouseY;

  let dx = (targetX - bigCircle.x) * easing;
  let dy = (targetY - bigCircle.y) * easing;
  bigCircle.x += dx;
  bigCircle.y += dy;

  trail.push(createVector(bigCircle.x, bigCircle.y));

  for (let i = 0; i < trail.length; i++) {
    let alpha = map(i, 0, trail.length, trailAlpha, 0);
    bigCircle.displayWithAlpha(alpha, trail[i].x, trail[i].y);
  }

  if (trail.length > 50) {
    trail.splice(0, 1);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    if (bigCircle.contains(particles[i])) {
      bigCircle.changeColor(particles[i].color);
      particles.splice(i, 1);
      // regenerate particles
      let x = random(width);
      let y = random(height);
      let c = color(random(200, 255), random(200, 255), random(200, 255), 150);
      particles.push(new Particle(x, y, c));
    }
  }

  bigCircle.display();
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = color(255);
  }

  display() {
    fill(this.col);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }

  displayWithAlpha(alpha, x, y) {
    fill(red(this.col), green(this.col), blue(this.col), alpha);
    noStroke();
    ellipse(x, y, this.r * 2);
  }

  contains(particle) {
    let d = dist(this.x, this.y, particle.x, particle.y);
    return d < this.r;
  }

  changeColor(newColor) {
    this.col = newColor;
  }
}

class Particle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.color = c;
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
  }
}
