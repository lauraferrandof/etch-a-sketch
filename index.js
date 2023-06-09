// Select the elements on the page
const canvasEl = document.querySelector("#etch-a-sketch");
const canvasCtx = canvasEl.getContext("2d");
const shakeBtn = document.querySelector(".shake");
const moveBtns = document.querySelectorAll(".move");

// Variables
const { width, height } = canvasEl;
const MOVE_AMOUNT = 10;
let x;
let y;
let hue = 0;

// Setup our canvas for drawing
// Style the canvas line
canvasCtx.lineJoin = "round";
canvasCtx.lineCap = "round";
canvasCtx.lineWidth = MOVE_AMOUNT;
// Style the canvas line stroke
canvasCtx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

// Add marker to random position
function addMarker() {
  // Create random x and y starting coordinates on the canvas based on the canvas width and height
  // We get a random integer number (rounded down) between 0 and the canvas width/height
  x = Math.floor(Math.random() * width);
  y = Math.floor(Math.random() * height);

  canvasCtx.beginPath();
  canvasCtx.moveTo(x, y);
  canvasCtx.lineTo(x, y);
  canvasCtx.stroke();
}

// Draw function
function draw({ key }) {
  // Increment the hue to update canvas line stroke style
  hue += 10;
  canvasCtx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // Start the path
  canvasCtx.beginPath();
  // Move to previous position
  canvasCtx.moveTo(x, y);
  // Update the x and y values depending on what the user did
  switch (key) {
    case "ArrowUp":
      y -= MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y += MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      x -= MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  // Move to the new coordinates
  canvasCtx.lineTo(x, y);
  canvasCtx.stroke();
}

// Handler for the keys
function handleKey(e) {
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// Clear function
function clearCanvas() {
  // Add shake animation
  canvasEl.classList.add("shake");
  // Clear canvas content and reset hue
  canvasCtx.clearRect(0, 0, width, height);
  hue = 0;
  canvasCtx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // Add new random starting point
  addMarker();
  // Remove shake class after animation ends
  canvasEl.addEventListener(
    "animationend",
    function () {
      canvasEl.classList.remove("shake");
    },
    // Remove event listener after the event is done
    { once: true }
  );
}

function handleMoveButton(e) {
  // Increment the hue to update canvas line stroke style
  hue += 10;
  canvasCtx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // Start the path
  canvasCtx.beginPath();
  // Move to previous position
  canvasCtx.moveTo(x, y);
  // Update the x and y values depending on what the user did
  switch (e.currentTarget.dataset.move) {
    case "up":
      y -= MOVE_AMOUNT;
      break;
    case "down":
      y += MOVE_AMOUNT;
      break;
    case "left":
      x -= MOVE_AMOUNT;
      break;
    case "right":
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  // Move to the new coordinates
  canvasCtx.lineTo(x, y);
  canvasCtx.stroke();
}

// Listen for arrow keys
window.addEventListener("keydown", handleKey);
// Listen for clear button clicks
shakeBtn.addEventListener("click", clearCanvas);
// Listen for move buttons clicks
moveBtns.forEach((button) =>
  button.addEventListener("click", handleMoveButton)
);

// Put a marker on the canvas to start drawing
addMarker();
