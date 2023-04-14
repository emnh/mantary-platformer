import './style.css'

import interact from 'interact.js';
import protagonistImgSrc from './images/protagonist.png';

let jsonTextarea;

const images = {
  protagonist: { 
    src: protagonistImgSrc
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

  const images = document.getElementsByTagName('img');
  const imageData = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const rect = image.getBoundingClientRect();
    const x = rect.x + window.pageXOffset;
    const y = rect.y + window.pageYOffset;
    imageData.push({ src: image.src, x: x, y: y });
  }

  jsonTextarea.value = JSON.stringify(imageData, null, 2);
  // Set the size of the textarea to the size of the text
  jsonTextarea.style.height = Math.min(800, jsonTextarea.scrollHeight) + 'px';
};

const addProtagonist = function() {
  const protagonistImg = new Image();
  protagonistImg.src = protagonistImgSrc;
  protagonistImg.width = 100;

  const protagonistDiv = document.createElement('div');
  protagonistDiv.appendChild(protagonistImg);
  document.body.appendChild(protagonistDiv);

  interact(protagonistDiv).draggable({
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
  addProtagonist();
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