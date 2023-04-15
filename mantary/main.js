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
import platformImg5Src from './images/platform5.png';
import platformImg6Src from './images/platform6.png';
import fireballSrc from './images/fireball.png';
import locations from './locations.json';

const appBody = document.getElementById('app');
let worldPosition = { x: 0, y: 0 };
let velocityY = 0;
let jsonTextarea;
let facing = 'right';

const images = {
  protagonist: {
    name: 'protagonist',
    src: protagonistImgSrc,
    height: 150,
    elements: [],
    zindex: 2,
  },
  redtree: {
    name: 'redtree',
    src: redTreeImgSrc,
    width: 200,
    elements: [],
    zIndex: -2
  },
  platform1: {
    name: 'platform1',
    src: platformImg1Src,
    width: 768,
    elements: [],
    zindex: 1
  },
  platform2: {
    name: 'platform2',
    src: platformImg2Src,
    width: 256,
    elements: [],
    zindex: 1
  },
  platform3: {
    name: 'platform3',
    src: platformImg3Src,
    width: 256,
    elements: [],
    zindex: 1
  },
  platform4: {
    name: 'platform4',
    src: platformImg4Src,
    width: 256,
    elements: [],
    zindex: 1
  },
  platform5: {
    name: 'platform5',
    src: platformImg5Src,
    width: 512,
    elements: [],
    zindex: 1,
    walkOffset: 128
  },
  platform6: {
    name: 'platform6',
    src: platformImg6Src,
    width: 512,
    elements: [],
    zindex: 1,
    walkOffset: 150
  },
};

const rndPlatforms = [
  images['platform2'],
  images['platform3'],
  images['platform4'],
  images['platform5'],
  images['platform6']
];
const platforms = [];
const forest = [];
const fireballs = [];

const intervalsOverlap = function(interval1, interval2) {
  // Get the minimum and maximum values for each interval
  const interval1Min = Math.min(interval1[0], interval1[1]);
  const interval1Max = Math.max(interval1[0], interval1[1]);
  const interval2Min = Math.min(interval2[0], interval2[1]);
  const interval2Max = Math.max(interval2[0], interval2[1]);

  // Check if the intervals overlap
  if (interval1Max >= interval2Min && interval2Max >= interval1Min) {
    return true;
  } else {
    return false;
  }
};

const worldToProtagonist = function(worldX, worldY) {
  const protagonistDiv = images.protagonist.elements[0];
  const imageTags = protagonistDiv.getElementsByTagName('img');
  const image = imageTags[0];

  // Get the width and height of the image
  const width = image.width;
  const height = image.height;

  // Get the width and height of the viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Calculate the center coordinates
  const centerX = (viewportWidth - width) / 2 - worldX;
  //const centerY = (viewportHeight - height) / 2 - worldPosition.y;
  const centerY = worldY;

  return { protagonistDiv, x: centerX, y: centerY, width, height };
};

const protagonistToWorld = function(protagonistX, protagonistY) {
  const protagonistDiv = images.protagonist.elements[0];
  const imageTags = protagonistDiv.getElementsByTagName('img');
  const image = imageTags[0];

  // Get the width and height of the image
  const width = image.width;
  const height = image.height;

  // Get the width and height of the viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Calculate the center coordinates
  const centerX = protagonistX - (viewportWidth - width) / 2;
  //const centerY = (viewportHeight - height) / 2 - worldPosition.y;
  const centerY = protagonistY;

  return { protagonistDiv, x: centerX, y: centerY, width, height };
};

const importJSON = function(json) {
  const imageData = json;

  for (let i = 0; i < imageData.length; i++) {
    const data = imageData[i];
    const imageInfo = images[data.name];

    if (imageInfo && imageInfo.elements[parseInt(data.index)]) {
      const imageDiv = imageInfo.elements[parseInt(data.index)];
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
    appBody.appendChild(jsonTextarea);
  }

  const imageData = [];

  for (const imageName in images) {
    if (images.hasOwnProperty(imageName) && images[imageName].elements) {
      const imageInfo = images[imageName];
      for (let i = 0; i < imageInfo.elements.length; i++) {
        const rect = imageInfo.elements[i].getBoundingClientRect();
        const x = rect.x + window.pageXOffset;
        const y = rect.y + window.pageYOffset;
        imageData.push({ name: imageName, index: i, src: imageInfo.src, x: x, y: y });
      }
    }
  }

  jsonTextarea.value = JSON.stringify(imageData, null, 2);
  // Set the size of the textarea to the size of the text
  jsonTextarea.style.height = Math.min(800, jsonTextarea.scrollHeight) + 'px';
  // Set the width also
  jsonTextarea.style.width = 400 + 'px';
};

const addImage = function(imageName, x, y, draggable = true, container = appBody) {
  const imageInfo = images[imageName];

  const image = new Image();
  image.src = imageInfo.src;

  const imageDiv = document.createElement('div');
  imageDiv.style.position = 'absolute'; // Set position to absolute
  imageDiv.style.left = x + 'px'; // Initialize left position to 0
  imageDiv.style.top = y + 'px'; // Initialize top position to 0
  imageDiv.appendChild(image);
  container.appendChild(imageDiv);

  // Add the created image element to the elements array
  imageInfo.elements.push(imageDiv);

  // Set the z-index of the image if it exists
  if (imageInfo.zindex) {
    imageDiv.style.zIndex = imageInfo.zindex;
    image.style.zIndex = imageInfo.zindex;
  }
  if (imageInfo.width) {
    image.width = imageInfo.width;
  }
  if (imageInfo.height) {
    image.height = imageInfo.height;
  }

  if (draggable) {
    interact(imageDiv).draggable({
      onmove: function (event) {
        const target = event.target;
        const x = (parseFloat(target.style.left) || 0) + event.dx;
        const y = (parseFloat(target.style.top) || 0) + event.dy;
        target.style.left = `${x}px`; // Set left position
        target.style.top = `${y}px`; // Set top position
        // exportJSON();
      }
    });
  } else {

  }

  return imageDiv;
};


let ix = 0;
let lastIx = 0;
const redrawForest = function(cx, cy) {
  // TODO: Should be the original window.innerWidth, or we need to regen the forest on browser resize.
  const wh = window.innerWidth;
  ix = Math.round(cx * 2 / wh);
  if (ix === lastIx) {
    return;
  }
  lastIx = ix;
  // console.log("Redraw forest");
  // For each tree in the forest
  for (let i = 0; i < forest.length; i++) {
    const tree = forest[i];
    // const x = tree.getBoundingClientRect().x;
    const x = parseInt(tree.style.left);
    let nx = x + cx;
    if (nx < -wh) {
      nx += 3 * wh;
    } else if (nx > 2 * wh) {
      nx -= 3 * wh;
    }
    tree.style.left = (nx - cx) + 'px';
    // if (i == 0) {
    //   console.log(x, nx, wh, cx);
    // }
    // break;
  }
};

const centerProtagonist = function() {
  const {protagonistDiv, x, y} = worldToProtagonist(worldPosition.x, worldPosition.y);

  // Set the position of the protagonist div to the center
  protagonistDiv.style.position = 'absolute';
  protagonistDiv.style.left = `${x}px`;
  protagonistDiv.style.top = `${y}px`;

  redrawForest(worldPosition.x, worldPosition.y);
};

const addMovementCode = function() {
  let keysPressed = {};
  let moveDistance = 0.4;
  let lastState = 'idle';
  let lastTimestamp = performance.now();
  let startJump = 0;
  let startFireball = 0;
  const protagonistImage = images.protagonist.elements[0].getElementsByTagName('img')[0];

  document.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;
    // console.log(event.key);
  });

  document.addEventListener('keyup', function(event) {
    delete keysPressed[event.key];
  });

  const boundsCheck = function(elapsedVelocityY, jumping) {
    let onGround = false;
    for (let i = 0; i < platforms.length; i++) {
      const platform = platforms[i];
      const platformRect = platform.getElementsByTagName('img')[0].getBoundingClientRect();
      const protagonistRect = protagonistImage.getBoundingClientRect();
      // if (protagonistRect.bottom <= platformRect.bottom && protagonistRect.bottom >= platformRect.top && protagonistRect.right >= platformRect.left && protagonistRect.left <= platformRect.right) {
      // if (worldPosition.y <= platformRect.bottom && worldPosition.y >= platformRect.top && protagonistRect.right >= platformRect.left && protagonistRect.left <= platformRect.right) {
      const insidePlatform = 50;
      const walkOffset = images[platform.dataset.name].walkOffset ?? 100;
      const platformThreshold = platformRect.top + walkOffset;
      const x = protagonistRect.left;
      const y1 = protagonistRect.bottom;
      const y2 = protagonistRect.bottom + elapsedVelocityY;
      const width = protagonistRect.width;
      const height = protagonistRect.height;
      // const check1 =
      //   y1 >= platformThreshold &&
      //   y1 <= platformThreshold + insidePlatform;
      // const check2 =
      //   y2 >= platformThreshold &&
      //   y2 <= platformThreshold + insidePlatform;
      const interval1 = [y1, y2];
      const interval2 = [platformThreshold, platformThreshold + insidePlatform];
      const overlaps = intervalsOverlap(interval1, interval2);
      if (overlaps && !jumping &&
          x + width >= platformRect.left &&
          x <= platformRect.right) {
        // worldPosition.y = (platformRect.top + protagonistRect.height);
        const world = protagonistToWorld(x, platformThreshold - height);
        worldPosition.y = world.y;
        onGround = true;
        break;
      }
    }
    
    const threshold = window.innerHeight - protagonistImage.height;
    if (worldPosition.y + velocityY >= threshold) {
      worldPosition.y = threshold;
      onGround = true;
    }

    return onGround;
  };

  function updateWorldPosition() {
    const timestamp = performance.now();
    const elapsed = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    let moved = false;
    const jumping = (performance.now() - startJump) < 200;
    // const {x, y, width, height} = worldToProtagonist(worldPosition.x, worldPosition.y);
  
    // Check if the character is on the ground
    // const onGround = worldPosition.y <= 0;
    // if (worldPosition < 0) {
    //   worldPosition = 0;
    // }
    
    let onGround = boundsCheck(velocityY * elapsed, jumping);
  
    if ('a' in keysPressed || 'A' in keysPressed || 'ArrowLeft' in keysPressed) {
      worldPosition.x += moveDistance * elapsed;
      moved = true;
      protagonistImage.classList.add('flip-horizontal');
      facing = 'left';
    }
  
    if ('d' in keysPressed || 'D' in keysPressed || 'ArrowRight' in keysPressed) {
      worldPosition.x -= moveDistance * elapsed;
      moved = true;
      protagonistImage.classList.remove('flip-horizontal');
      facing = 'right';
    }
  
    if (('w' in keysPressed || 'W' in keysPressed || 'ArrowUp' in keysPressed) && onGround) {
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

    const fireballElapsed = performance.now() - startFireball;
    if (' ' in keysPressed && fireballElapsed >= 250) {
      // Add a fireball div
      const fireball = document.createElement('img');
      fireball.width = 70;
      fireball.src = fireballSrc;
      fireball.classList.add('fireball');
      fireball.style.position = 'absolute';
      const {x, y} = worldToProtagonist(worldPosition.x, worldPosition.y);
      fireball.style.left = x + 'px';
      fireball.style.top = y + 'px';
      fireball.dataset.velocityX = 1;
      if (facing === 'left') {
        fireball.classList.add('flip-horizontal');
      } else {
        fireball.dataset.velocityX = -fireball.dataset.velocityX;
      }
      fireball.dataset.rotation = 0;
      fireball.dataset.facing = facing;
      fireball.style.zIndex = 3;
      appBody.appendChild(fireball);
      fireballs.push(fireball);
      startFireball = performance.now();
    }
    // Update fireballs
    // console.log(fireballs.length);
    
    const bounds = appBody.getBoundingClientRect();
    for (let i = 0; i < fireballs.length; i++) {
      const fireball = fireballs[i];      
      const fireballWorld = {
        x: parseFloat(fireball.style.left),
        y: parseFloat(fireball.style.top),
      };
      fireballWorld.x -= fireball.dataset.velocityX * elapsed;
      //const fx = fireballWorld.x + worldPosition.x;
      // const {x, y} = worldToProtagonist(worldPosition.x, worldPosition.y);
      const fx = fireballWorld.x;
      // console.log(bounds);
      if (fx <= -bounds.x || fx >= -(bounds.x - window.innerWidth + fireball.width)) {
        fireball.remove();
        fireballs.splice(i, 1);
        i--;
        continue;
        // fireball.dataset.velocityX = -fireball.dataset.velocityX;
      }
      fireball.dataset.rotation = parseFloat(fireball.dataset.rotation) + 10;
      fireball.style.left = fireballWorld.x + 'px';
      fireball.style.top = fireballWorld.y + 'px';
      fireball.style.transform = `rotate(${fireball.dataset.rotation}deg)`;
      fireball.style.filter = `hue-rotate(${0.1 * Math.abs(Math.sin(fireball.dataset.rotation * 0.1))}rad)`;
    }
  
    // Apply gravity to the character when not on the ground
    if (startJump > 0 && jumping) {
      velocityY -= 0.008 * elapsed;
      worldPosition.y += velocityY * elapsed;
      //startJump = performance.now();
      // console.log(startJump, performance.now() - startJump);
    } else if (!onGround) {
      velocityY += 0.01 * elapsed;
      worldPosition.y += velocityY * elapsed;
    } else {
      velocityY = 0;
    }

    onGround = boundsCheck(velocityY * elapsed, jumping);
  
    // Change the character image depending on its state
    if (!onGround) {
      if (lastState !== 'jump') {
        protagonistImage.src = protagonistJumpImgSrc;
        lastState = 'jump';
      }
    } else if (moved) {
      if (lastState !== 'walk') {
        protagonistImage.src = protagonistWalkImgSrc;
        lastState = 'walk';
      }
    } else if (lastState !== 'idle') {
      protagonistImage.src = protagonistImgSrc;
      lastState = 'idle';
    }
  
    // Update the position of the character
    // appBody.style.transform = `translate(${worldPosition.x}px, ${worldPosition.y}px)`;
    appBody.style.transform = `translate(${worldPosition.x}px, ${0}px)`;
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
    let platformLeft = Math.floor(Math.random() * (window.innerWidth - platformWidth));
    let platformTop = Math.floor(Math.random() * (window.innerHeight - platformHeight));

    // Check if the platform overlaps with any other element
    let overlapping = true;
    while (overlapping) {
      overlapping = false;
      for (const imageName in images) {
        if (images.hasOwnProperty(imageName)) {
          const imageInfo = images[imageName];
          if (imageInfo.element !== null) {
            for (let i = 0; i < imageInfo.elements.length; i++) {
              const rect = imageInfo.elements[i].getBoundingClientRect();
              const left = rect.left;
              const top = rect.top;
              const width = rect.width;
              const height = rect.height;
              if (platformLeft < (left + width) && (platformLeft + platformWidth) > left && platformTop < (top + height) && (platformTop + platformHeight) > top) {
                overlapping = true;
                platformLeft = Math.floor(Math.random() * (window.innerWidth - platformWidth));
                platformTop = Math.floor(Math.random() * (window.innerHeight - platformHeight));
                break;
              }
            }
          }
        }
      }
    }

    // Add the platform to the world
    const platform = addImage(platformInfo.name, platformLeft, platformTop);
    platform.dataset.name = platformInfo.name;
    platforms.push(platform);
  }
}

const addForest = function() {
  // Add forest div
  const forestDiv = document.createElement('div');
  forestDiv.id = 'forest';
  // forest.style.zIndex = -2;
  appBody.appendChild(forestDiv);
  forestDiv.style.opacity = 0.25;
  // forestDiv.style.position = 'absolute';

  for (let x = -window.innerWidth; x < 2 * window.innerWidth; x += 100) {
    for (let y1 = 0.0 * window.innerHeight; y1 < window.innerHeight - 100; y1 += 100) {
      const y = y1 + 200 * Math.random();
      const x2 = x + 100 * Math.random();
      const div = addImage('redtree', x2, y, false, forestDiv);
      const img = div.getElementsByTagName('img')[0];
      // div.style.position = 'relative';
      img.style.pointerEvents = 'none';
      img.style.filter = `hue-rotate(${360 * Math.random()}deg)`;
      img.style.width = Math.random() * 200 + 100 + 'px';
      const pct = y / window.innerHeight;
      // img.style.width = 200 * pct + 'px';
      div.style.top = '';
      div.style.bottom = -y + 'px';
      // img.style.zIndex = y;
      // img.style.opacity = pct;
      forest.push(div);
    }
    // const before = document.createElement('img');
    // div.prepend(before);
    // before.style.width = '100%';
    // before.style.height = '100%';
    // before.style.position = 'absolute';
    // before.style.left = 0;
    // before.style.top = 0;
    // before.style.opacity = 0.5;
    // // Set random color
    // before.style.backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;
    // // before.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    // before.src = redTreeImgMaskSrc;
    // before.style.mixBlendMode = 'multiply';


    // div.zIndex = -2;
    // img.style.zIndex = -2;
  }
};

const main = function() {
  // Add background image

  // const img = document.createElement('img');
  // img.id = 'background';
  // img.width = window.innerWidth;
  // img.height = window.innerHeight;
  // img.src = backgroundImgSrc;
  // img.style.zIndex = -2;
  // img.style.position = 'absolute';
  // img.style.left = 0;
  // img.style.top = 0;
  // appBody.appendChild(img);

  for (const imageName in images) {
    if (images.hasOwnProperty(imageName) && imageName ==="protagonist") {
      addImage(imageName, 0, 0);
    }
  }

  addPlatforms();

  addForest();
  // importJSON(locations);
  addMovementCode();
  
  // exportJSON();
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