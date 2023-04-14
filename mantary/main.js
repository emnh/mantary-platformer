import './style.css';
import interact from 'interact.js';
import protagonistImgSrc from './images/protagonist.png';
import protagonistWalkImgSrc from './images/walk.webp';
import protagonistJumpImgSrc from './images/jump.gif';
import redTreeImgSrc from './images/redtree.png';
import platformImg1Src from './images/platform1.png';
import platformImg2Src from './images/platform2.png';
import platformImg3Src from './images/platform3.png';
import platformImg4Src from './images/platform4.png';
import locations from './locations.json';

let worldPosition = { x: 0, y: 0 };
let jsonTextarea;

const images = {
  protagonist: {
    name: 'protagonist',
    src: protagonistImgSrc,
    width: 100,
    element: null,
    zindex: 1,
  },
  redtree: {
    name: 'redtree',
    src: redTreeImgSrc,
    width: 200,
    element: null
  },
  platform1: {
    name: 'platform1',
    src: platformImg1Src,
    width: 768,
    element: null,
    zindex: -1
  },
  platform2: {
    name: 'platform2',
    src: platformImg2Src,
    width: 256,
    element: null,
    zindex: -1
  },
  platform3: {
    name: 'platform3',
    src: platformImg3Src,
    width: 256,
    element: null,
    zindex: -1
  },
  platform4: {
    name: 'platform4',
    src: platformImg4Src,
    width: 256,
    element: null,
    zindex: -1
  } 
};

const rndPlatforms = [images['platform2'], images['platform3'], images['platform4']];
const platforms = [];

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
    if (images.hasOwnProperty(imageName) && images[imageName].element) {
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

const addImage = function(imageName, x, y) {
  const imageInfo = images[imageName];

  const image = new Image();
  image.src = imageInfo.src;
  image.width = imageInfo.width;

  const imageDiv = document.createElement('div');
  imageDiv.style.position = 'absolute'; // Set position to absolute
  imageDiv.style.left = x + 'px'; // Initialize left position to 0
  imageDiv.style.top = y + 'px'; // Initialize top position to 0
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
  let moveDistance = 0.2;
  let lastMoved = false;
  let lastOnGround = false;
  let lastTimestamp = performance.now();
  let startJump = 0;
  const image = images.protagonist.element.getElementsByTagName('img')[0];

  document.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;
    // console.log(event.key);
  });

  document.addEventListener('keyup', function(event) {
    delete keysPressed[event.key];
  });

  function updateWorldPosition() {
    const timestamp = performance.now();
    const elapsed = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    let moved = false;
    let velocityY = 0;
  
    // Check if the character is on the ground
    const onGround = worldPosition.y <= 0;
    if (worldPosition < 0) {
      worldPosition = 0;
    }
  
    if ('a' in keysPressed) {
      worldPosition.x += moveDistance * elapsed;
      moved = true;
      image.classList.add('flip-horizontal');
    }
  
    if ('d' in keysPressed) {
      worldPosition.x -= moveDistance * elapsed;
      moved = true;
      image.classList.remove('flip-horizontal');
    }
  
    if ('w' in keysPressed && onGround) {
      // Apply an upward force to the character when jumping
      // worldPosition.y += 1;
      // velocityY = -20;
      moved = true;
      startJump = performance.now();
    }
  
    if ('s' in keysPressed) {
      // worldPosition.y -= moveDistance * elapsed;
      // moved = true;
    }
  
    // Apply gravity to the character when not on the ground
    if (startJump > 0 && (performance.now() - startJump) < 200) {
      velocityY -= 0.1 * elapsed;
      worldPosition.y -= velocityY * elapsed;
      //startJump = performance.now();
      // console.log(startJump, performance.now() - startJump);
    } else if (!onGround) {
      velocityY += 0.05 * elapsed;
      worldPosition.y -= velocityY * elapsed;
    } else {
      velocityY = 0;
    }
  
    // Change the character image depending on its state
    if (!onGround) {
      moved = true;
      if (!lastOnGround) {
        image.src = protagonistJumpImgSrc;
        lastOnGround = true;
      }
    } else if (moved) {
      if (!lastMoved || lastOnGround) {
        image.src = protagonistWalkImgSrc;
        lastOnGround = false;
      }
    } else {
      image.src = protagonistImgSrc;
      lastOnGround = false;
    }
    lastMoved = moved;
  
    // Update the position of the character
    // document.body.style.transform = `translate(${worldPosition.x}px, ${worldPosition.y}px)`;
    document.body.style.transform = `translate(${worldPosition.x}px, ${0}px)`;
    centerProtagonist();
    // console.log(worldPosition);
  
    requestAnimationFrame(updateWorldPosition);
  }
  

  requestAnimationFrame(updateWorldPosition);
};

const addPlatforms = function() {
  // Add random platforms to the world
  const numPlatforms = 10;
  for (let i = 0; i < numPlatforms; i++) {
    const platformInfo = rndPlatforms[Math.floor(Math.random() * rndPlatforms.length)];
    const platformWidth = platformInfo.width;
    const platformHeight = 50;
    const platformLeft = Math.floor(Math.random() * (window.innerWidth - platformWidth));
    let platformTop = Math.floor(Math.random() * (window.innerHeight - platformHeight));

    // Check if the platform overlaps with any other element
    let overlapping = true;
    while (overlapping) {
      overlapping = false;
      for (const imageName in images) {
        if (images.hasOwnProperty(imageName)) {
          const imageInfo = images[imageName];
          if (imageInfo.element !== null) {
            const rect = imageInfo.element.getBoundingClientRect();
            const left = rect.left;
            const top = rect.top;
            const width = rect.width;
            const height = rect.height;
            if (platformLeft < (left + width) && (platformLeft + platformWidth) > left && platformTop < (top + height) && (platformTop + platformHeight) > top) {
              overlapping = true;
              platformTop += height;
              break;
            }
          }
        }
      }
    }

    // Add the platform to the world
    addImage(platformInfo.name, platformLeft, platformTop);
  }
}

const main = function() {
  for (const imageName in images) {
    if (images.hasOwnProperty(imageName) && imageName ==="protagonist") {
      addImage(imageName, 0, 0);
    }
  }
  importJSON(locations);
  exportJSON();
  addMovementCode();
  addPlatforms();
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