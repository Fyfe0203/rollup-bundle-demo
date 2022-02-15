import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs-extra';
import ps from 'path';

export default {
    input: './index.js',
    output: [{
        file: './lib/walletconnect-bundle.js',
        format: 'esm',
    }],
    plugins: [
        resolve({
            browser: true,
        }),
        commonjs({}),
        {
            name: 'types',
            async renderStart({ file }) {
                await fs.outputFile(ps.join(ps.dirname(file), 'package.json'), `{ "type": "module" }\n`, 'utf8');
                await fs.copyFile(ps.join(__dirname, './index.d.ts'), file.replace(/\.js$/, '.d.ts'));
            },
        },
    ],
};
