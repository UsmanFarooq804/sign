const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set default styles
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000000'; // Default color

// Function to draw lines
function draw(event) {
    if (!isDrawing) return;

    let mouseX, mouseY;

    if (event.type === 'mousemove' || event.type === 'mousedown' || event.type === 'mouseup' || event.type === 'mouseout') {
        // Mouse events
        mouseX = event.offsetX;
        mouseY = event.offsetY;
    } else if (event.type === 'touchmove' || event.type === 'touchstart' || event.type === 'touchend') {
        // Touch events
        mouseX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
        mouseY = event.touches[0].clientY - canvas.getBoundingClientRect().top;
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();

    lastX = mouseX;
    lastY = mouseY;
}

// Mouse event listeners
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// Touch event listeners
canvas.addEventListener('touchstart', (event) => {
    isDrawing = true;
    lastX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
    lastY = event.touches[0].clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', () => isDrawing = false);

// Clear button
document.getElementById('clearButton').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save button
document.getElementById('saveButton').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Color picker for text color
document.getElementById('colorPicker').addEventListener('input', (event) => {
    ctx.strokeStyle = event.target.value;
});

// Color picker for background color
document.getElementById('canvasColor').addEventListener('input', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Font size picker
document.getElementById('fontSizePicker').addEventListener('change', (event) => {
    ctx.font = `${event.target.value} Arial`;
});
