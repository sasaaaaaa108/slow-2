let angle = 0;
const fg = "#E0B1B1";
const bg = "#684830";
let planeCount = 3;
let cg;
let font;

function preload() {
  font = loadFont("Syne-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cg = createGraphics(900, 120);
}

function draw() {
  cg.background(bg);
  cg.textSize(100);
  cg.textAlign(CENTER);
  cg.textStyle(BOLD);
  cg.fill(fg);
  cg.textFont(font);
  cg.text("Sally Chen", cg.width / 2, cg.height - 30);

  background(bg);
  orbitControl();
  noStroke();

  for (let k = 0; k < 3; k++) { // Adding a loop to draw the planes three times in different vertical positions
    rotateY(angle); // Rotate around the y-axis for vertical loop
    rotateX(angle); // Rotate around the x-axis for horizontal loop

    texture(cg);

    // Draw planes
    for (let j = 0; j < 3; j++) { // Adding a loop to draw the planes three times in different horizontal positions
      for (let i = 0; i < planeCount; i++) {
        rotateX(TWO_PI / planeCount);
        push(); // Save the current drawing state
        translate(0, 0, -j * 200); // Move each set of planes along the z-axis
        translate(0, -k * 200, 0); // Move each set of planes along the y-axis
        plane(200, 100);
        pop(); // Restore the previous drawing state
      }
    }
  }

  const t = height / 2;
  const distToCenter = abs(mouseX - t);
  const aMin = 0;
  const aMax = t;
  const bMin = 0.0;
  const bMax = 0.009;
  const speedValue = map(distToCenter, aMin, aMax, bMin, bMax);

  if (mouseX > t) {
    angle += speedValue;
  } else {
    angle -= speedValue;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    planeCount += 2;
  } else if (keyCode === DOWN_ARROW) {
    planeCount -= 2;
  }
}