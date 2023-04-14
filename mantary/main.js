import './style.css';
import interact from 'interact.js';
import protagonistImgSrc from './images/protagonist.png';
import redTreeImgSrc from './images/redtree.png';
import platformImgSrc from './images/platform1.png';
import locations from './locations.json';

let worldPosition = { x: 0, y: 0 };
let jsonTextarea;

const images = {
  protagonist: {
    src: protagonistImgSrc,
    width: 100,
    element: null,
    zindex: 1,
  },
  redtree: {
    src: redTreeImgSrc,
    width: 200,
    element: null
  },
  platform1: {
    src: platformImgSrc,
    width: 768,
    element: null,
    zindex: -1
  }
};

const importJSON = function(json) {
  const imageData = json;

  for (let i = 0; i < imageData.length; i++) {
    const data = imageData[i];
    const imageInfo = images[data.name];

    if (imageInfo && imageInfo.element) {
      const imageDiv = imageInfo.element;
      const x = parseFloat(data.x) || 0;
      const y = parseFloat(data.y) || 0;
      imageDiv.style.left = `${x}px`; // Set left position
      imageDiv.style.top = `${y}px`; // Set top position
    }
  }
};

const exportJSON = function() {
  if (!jsonTextarea) {
    // If the textarea element doesn't exist, create it and append it to the body
    jsonTextarea = document.createElement('textarea');
    jsonTextarea.style.maxHeight = '800px'; // Set a fixed maximum height
    jsonTextarea.style.overflowY = 'scroll'; // Display a scrollbar when content overflows
    document.body.appendChild(jsonTextarea);
  }

  const imageData = [];

  for (const imageName in images) {
    if (images.hasOwnProperty(imageName)) {
      const imageInfo = images[imageName];
      const rect = imageInfo.element.getBoundingClientRect();
      const x = rect.x + window.pageXOffset;
      const y = rect.y + window.pageYOffset;
      imageData.push({ name: imageName, src: imageInfo.src, x: x, y: y });
    }
  }

  jsonTextarea.value = JSON.stringify(imageData, null, 2);
  // Set the size of the textarea to the size of the text
  jsonTextarea.style.height = Math.min(800, jsonTextarea.scrollHeight) + 'px';
  // Set the width also
  jsonTextarea.style.width = 400 + 'px';
};

const addImage = function(imageName) {
  const imageInfo = images[imageName];

  const image = new Image();
  image.src = imageInfo.src;
  image.width = imageInfo.width;

  const imageDiv = document.createElement('div');
  imageDiv.style.position = 'absolute'; // Set position to absolute
  imageDiv.style.left = '0'; // Initialize left position to 0
  imageDiv.style.top = '0'; // Initialize top position to 0
  imageDiv.appendChild(image);
  document.body.appendChild(imageDiv);

  imageInfo.element = imageDiv;

  // Set the z-index of the image if it exists
  if (imageInfo.zindex) {
    imageDiv.style.zIndex = imageInfo.zindex;
  }

  interact(imageDiv).draggable({
    onmove: function (event) {
      const target = event.target;
      const x = (parseFloat(target.style.left) || 0) + event.dx;
      const y = (parseFloat(target.style.top) || 0) + event.dy;
      target.style.left = `${x}px`; // Set left position
      target.style.top = `${y}px`; // Set top position
      exportJSON();
    }
  });
};

const centerProtagonist = function() {
  // const protagonistDiv = document.createElement('div');
  // protagonistDiv.appendChild(images.protagonist.element);
  // document.body.appendChild(protagonistDiv);
  const protagonistDiv = images.protagonist.element;
  const imageTags = protagonistDiv.getElementsByTagName('img');
  const image = imageTags[0];

  // Get the width and height of the image
  const width = image.width;
  const height = image.height;

  // Get the width and height of the viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Calculate the center coordinates
  const centerX = (viewportWidth - width) / 2 - worldPosition.x;
  const centerY = (viewportHeight - height) / 2 - worldPosition.y;

  // Set the position of the protagonist div to the center
  protagonistDiv.style.position = 'absolute';
  protagonistDiv.style.left = `${centerX}px`;
  protagonistDiv.style.top = `${centerY}px`;
};

const addMovementCode = function() {
  let keysPressed = {};
  let moveDistance = 0.5;
  let lastTimestamp = performance.now();

  document.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;
  });

  document.addEventListener('keyup', function(event) {
    delete keysPressed[event.key];
  });

  function updateWorldPosition() {
    const timestamp = performance.now();
    const elapsed = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if ('a' in keysPressed) {
      worldPosition.x += moveDistance * elapsed;
    }

    if ('d' in keysPressed) {
      worldPosition.x -= moveDistance * elapsed;
    }

    if ('w' in keysPressed) {
      worldPosition.y += moveDistance * elapsed;
    }

    if ('s' in keysPressed) {
      worldPosition.y -= moveDistance * elapsed;
    }

    document.body.style.transform = `translate(${worldPosition.x}px, ${worldPosition.y}px)`;

    centerProtagonist();

    requestAnimationFrame(updateWorldPosition);
  }

  requestAnimationFrame(updateWorldPosition);
};

// Center the protagonist image

const main = function() {
  for (const imageName in images) {
    if (images.hasOwnProperty(imageName)) {
      addImage(imageName);
    }
  }
  importJSON(locations);
  exportJSON();
  addMovementCode();
};

const docReady = function(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
};

docReady(main);