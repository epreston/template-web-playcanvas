import './base.css';
import * as pc from 'playcanvas';
import { MiniStats } from '../node_modules/playcanvas/build/playcanvas-extras.mjs/mini-stats/mini-stats.js';

// create a canvas element at the app location
const canvas = document.createElement('canvas');
const appElement = document.querySelector('#app');
appElement.appendChild(canvas);

const assets = {
    mountain: new pc.Asset(
        'table-mountain-env-atlas',
        'texture',
        { url: '/assets/cubemaps/table-mountain-env-atlas.png' },
        { type: pc.TEXTURETYPE_RGBP, mipmaps: false }
    ),
    cube: new pc.Asset('cube', 'container', {
        url: '/assets/models/playcanvas-cube.glb'
    })
};

// use advanced API to render for control and smaller builds
pc.createGraphicsDevice(canvas)
    .then((device) => {
        const createOptions = new pc.AppOptions();
        createOptions.graphicsDevice = device;

        createOptions.componentSystems = [
            // @ts-ignore
            pc.RenderComponentSystem,
            // @ts-ignore
            pc.CameraComponentSystem,
            // @ts-ignore
            pc.LightComponentSystem
        ];

        createOptions.resourceHandlers = [
            // @ts-ignore
            pc.TextureHandler,
            // @ts-ignore
            pc.ContainerHandler
        ];

        const app = new pc.AppBase(canvas);
        app.init(createOptions);

        // fill the window and automatically change resolution
        app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
        app.setCanvasResolution(pc.RESOLUTION_AUTO);

        // show mini stats
        const miniStats = new MiniStats(app);
        miniStats.enabled = true;

        // ensure canvas is resized when window changes size
        window.addEventListener('resize', () => app.resizeCanvas());

        const assetListLoader = new pc.AssetListLoader(
            Object.values(assets),
            app.assets
        );

        // once assets are loaded, start rendering
        assetListLoader.load(() => {
            app.start();

            // get the instance of the cube render component and add it to scene
            const cubeEntity = assets.cube.resource.instantiateRenderEntity();
            cubeEntity.setLocalPosition(0, 6, 0);
            cubeEntity.setLocalScale(9, 9, 9);
            app.root.addChild(cubeEntity);

            // Create an Entity with a camera component
            const camera = new pc.Entity();
            camera.addComponent('camera', {
                clearColor: new pc.Color(0.38, 0.51, 0.58),
                farClip: 100
            });
            camera.translate(-20, 15, 20);
            camera.lookAt(0, 7, 0);
            app.root.addChild(camera);

            // set skybox
            app.scene.envAtlas = assets.mountain.resource;
            app.scene.toneMapping = pc.TONEMAP_ACES;
            app.scene.exposure = 0.5;
            app.scene.skyboxMip = 1;

            // spin the meshes
            app.on('update', function (dt) {
                if (cubeEntity) {
                    cubeEntity.rotate(10 * dt, 20 * dt, 30 * dt);
                }
            });
        });
    })
    .catch(console.error);
