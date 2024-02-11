// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

const canvas = document.createElement('canvas');
appDiv.appendChild(canvas);

canvas.width = 400;
canvas.height = 400;
