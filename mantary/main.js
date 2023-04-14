import './style.css';
import interact from 'interact.js';
import protagonistImgSrc from './images/protagonist.png';
import locations from './locations.json';

let jsonTextarea;

const images = {
  protagonist: {
    src: protagonistImgSrc,
    width: 100,
    element: null
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
      console.log(x, y);
      imageDiv.style.transform = `translate(${x}px, ${y}px)`;
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
  // imageDiv.style.position = 'absolute';
  imageDiv.appendChild(image);
  document.body.appendChild(imageDiv);

  imageInfo.element = imageDiv;

  interact(imageDiv).draggable({
    onmove: function (event) {
      const target = event.target;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      exportJSON();
    }
  });
};

const main = function() {
  for (const imageName in images) {
    if (images.hasOwnProperty(imageName)) {
      addImage(imageName);
    }
  }
  importJSON(locations);
  exportJSON();
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