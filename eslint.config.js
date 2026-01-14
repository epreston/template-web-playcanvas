import playcanvasConfig from '@playcanvas/eslint-config';
import globals from 'globals';

/** @type { import('eslint').Linter.Config[] } */
export default [
    ...playcanvasConfig,
    {
        name: 'project/config/ignores',
        ignores: ['**/dist', '**/public', '**/coverage']
    },
    {
        name: 'project/config/settings',
        rules: {
            // bugfix : allow promises (.then and .catch) to be indented
            indent: ['error', 4, { MemberExpression: 'off' }]
        },
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2024,
                ...globals.node
            }
        }
    },
    {
        name: 'project/config/playcanvas',
        languageOptions: {
            globals: {
                Ammo: 'readonly',
                earcut: 'readonly',
                glslang: 'readonly',
                GPUBufferUsage: 'readonly',
                GPUColorWrite: 'readonly',
                GPUMapMode: 'readonly',
                GPUShaderStage: 'readonly',
                GPUTextureUsage: 'readonly',
                opentype: 'readonly',
                pc: 'readonly',
                TWEEN: 'readonly',
                twgsl: 'readonly',
                webkitAudioContext: 'readonly',
                XRRay: 'readonly',
                XRWebGLLayer: 'readonly'
            }
        }
    }
];
