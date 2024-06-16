const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set default styles
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000000'; // Default color

function draw(event) {
    if (!isDrawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    [lastX, lastY] = [event.offsetX, event.offsetY];
}

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    [lastX, lastY] = [event.offsetX, event.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

document.getElementById('clearButton').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('saveButton').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL();
    link.click();
});

document.getElementById('colorPicker').addEventListener('input', (event) => {
    ctx.strokeStyle = event.target.value;
});

document.getElementById('canvasColor').addEventListener('input', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('fontSizePicker').addEventListener('change', (event) => {
    ctx.font = `${event.target.value} Arial`;
});
