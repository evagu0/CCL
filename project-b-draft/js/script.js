let NUM_OF_PARTICLES = 100; // Decide the initial number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(600, 600);
  //canvas.parent("canvasWrapper");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), height);
  }
}

function draw() {
  background(0, 25);

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = 10;
    this.speed = random(2, 5);
    this.angle = random(TWO_PI);
    this.xSpd = this.speed * cos(this.angle);
    this.ySpd = this.speed * sin(this.angle);
  }
  // methods (functions): particle's behaviors
  update() {
    this.x += this.xSpd;
    this.y += this.ySpd;
    this.ySpd += 0.1;
    
    if(this.y > height){
      this.x = random(width);
      this.y = random(height);
      this.ySpd = -this.speed * 0.7;
    }
    
  }
  display() {
    // particle's appearance
    push();
    noStroke();
    fill(random(255), random(255), random(255));
    translate(this.x, this.y);
    ellipse(0, 0, this.dia);
    pop();
  }
}
