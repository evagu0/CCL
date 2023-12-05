let stars = [];
let particleShape = "circle";
let currentColor = [255, 255, 255];
// color customization
let r = [242, 124, 129];
let o = [242, 171, 124];
let y = [252, 245, 146];
let g = [153, 212, 150];
let b = [142, 149, 245];
let p = [201, 151, 240];
let e = [255, 255, 255];
let k = [0];

let heartButton, flowerButton, diamondButton;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < 105; i++) {
    stars.push(new Star());
  }

  // buttons
  heartButton = createButton("Heart");
  heartButton.position(20, height / 12);
  heartButton.mousePressed(() => changeShape("heart"));

  flowerButton = createButton("Flower");
  flowerButton.position(width / 3, height / 12);
  flowerButton.mousePressed(() => changeShape("flower"));

  diamondButton = createButton("Diamond");
  diamondButton.position((2 * width) / 3, height / 12);
  diamondButton.mousePressed(() => changeShape("diamond"));
}

function draw() {
  background(0);

  fill(200);
  rect(0, 0, width, height / 6);

  // background
  fill(0, 0, 50);
  rect(0, height / 6, width, height - height / 6);

  stroke(1);
  line(0, 440, 600, 440);

  // rectangles to choose color
  drawColorRect(0, 490, 90, 75, r);
  drawColorRect(90, 490, 90, 75, o);
  drawColorRect(180, 490, 90, 75, y);
  drawColorRect(270, 490, 90, 75, g);
  drawColorRect(360, 490, 90, 75, b);
  drawColorRect(450, 490, 90, 75, p);
  drawColorRect(540, 490, 90, 75, e);

  if (mouseIsPressed) {
    changeColor();
  }

  // buttons
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(
    "Heart",
    heartButton.x + heartButton.width / 2,
    heartButton.y + heartButton.height / 2
  );
  text(
    "Flower",
    flowerButton.x + flowerButton.width / 2,
    flowerButton.y + flowerButton.height / 2
  );
  text(
    "Diamond",
    diamondButton.x + diamondButton.width / 2,
    diamondButton.y + diamondButton.height / 2
  );

  // Update and display stars
  for (let star of stars) {
    star.update();
    star.display();
  }
}

function drawColorRect(x, y, w, h, color) {
  fill(color[0], color[1], color[2]);
  rect(x, y, w, h);
}

function changeShape(shape) {
  particleShape = shape;

  for (let star of stars) {
    star.setShape(shape);
  }
}
function changeColor() {
  if (mouseY > height / 6) {
    if (mouseX < 90) {
      currentColor = r;
    } else if (mouseX > 90 && mouseX < 180) {
      currentColor = o;
    } else if (mouseX > 180 && mouseX < 270) {
      currentColor = y;
    } else if (mouseX > 270 && mouseX < 360) {
      currentColor = g;
    } else if (mouseX > 360 && mouseX < 450) {
      currentColor = b;
    } else if (mouseX > 450 && mouseX < 540) {
      currentColor = p;
    } else if (mouseX > 540 && mouseX < 630 && mouseY > 490 && mouseY < 565) {
      currentColor = e;
    }

    for (let star of stars) {
      star.setColor(currentColor);
    }
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 8);
    this.speed = random(0.005, 0.02);
    this.frequency = random(0.01, 0.03);
    this.angle = 0;
  }

  update() {
    // twirl
    this.x += this.speed;
    this.y = height / 2.1 + sin(this.x * this.frequency) * 170;

    this.angle += this.speed;
    this.x += cos(this.angle) * 2;
    this.y += sin(this.angle) * 2;

    if (this.x > width) {
      this.x = 0;
      this.y = random(height);
    }
  }

  setShape(shape) {
    this.shape = shape;
  }
  setColor(color) {
    this.color = color;
  }

  display() {
    if (particleShape === "flower") {
      drawFlower(this.x, this.y, 5, 8, 10);
      fill(currentColor[0], currentColor[1], currentColor[2]);
    } else if (particleShape === "heart") {
      drawHeart(this.x, this.y, 10);
      fill(currentColor[0], currentColor[1], currentColor[2]);
    } else if (particleShape === "diamond") {
      drawDiamond(this.x, this.y, 15);
      fill(currentColor[0], currentColor[1], currentColor[2]);
    } else {
      noStroke();
      fill(currentColor[0], currentColor[1], currentColor[2]);
      ellipse(this.x, this.y, this.size, this.size);
    }
  }
}

// shapes :3
function drawFlower(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function drawDiamond(x, y, size) {
  beginShape();
  vertex(x, y - size / 2);
  vertex(x + size / 2, y);
  vertex(x, y + size / 2);
  vertex(x - size / 2, y);
  endShape(CLOSE);
}

