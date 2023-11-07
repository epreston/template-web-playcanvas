// vite.config.js

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    // additional asset types
    assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.m4a', '**/*.hdr'],
    build: {
        target: [
            'es2022',
            'edge112',
            'firefox112',
            'chrome112',
            'safari16.4',
            'ios16.4'
        ],
        chunkSizeWarningLimit: 800,
        rollupOptions: {
            output: {
                // chunking and dependency size observability
                manualChunks: (id) => {
                    // create chunk for playcanvas extras deps.
                    if (id.includes('extras') || id.includes('mini-stats')) {
                        return 'extras';
                    }
                    // create chunk for playcanvas engine deps.
                    if (
                        id.includes('playcanvas') ||
                        id.includes('@playcanvas')
                    ) {
                        return 'engine';
                    }
                }
            }
        }
    }
});
