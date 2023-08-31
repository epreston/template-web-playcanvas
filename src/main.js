import './base.css';
import * as pc from 'playcanvas';
import { MiniStats } from '../node_modules/playcanvas/build/playcanvas-extras.mjs/mini-stats/mini-stats.js';

// create a canvas element at the app location
const canvas = document.createElement('canvas');
const location = document.querySelector('#app');
location.appendChild(canvas);

// create a PlayCanvas application
const app = new pc.Application(canvas);

// fill the available space at full resolution
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

// ensure canvas is resized when window changes size
window.addEventListener('resize', () => app.resizeCanvas());

// show mini stats
const miniStats = new MiniStats(app);
miniStats.enabled = true;

// create box entity
const box = new pc.Entity('cube');
box.addComponent('model', {
    type: 'box'
});
app.root.addChild(box);

// create camera entity
const camera = new pc.Entity('camera');
camera.addComponent('camera', {
    clearColor: new pc.Color(0.1, 0.1, 0.1)
});
camera.setPosition(0, 0, 3);
app.root.addChild(camera);

// create directional light entity
const light = new pc.Entity('light');
light.addComponent('light');
light.setEulerAngles(45, 0, 0);
app.root.addChild(light);

// rotate the box according to the delta time since the last frame
app.on('update', dt => box.rotate(10 * dt, 20 * dt, 30 * dt));

app.start();
