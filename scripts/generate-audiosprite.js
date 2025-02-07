const path = require('path');
const audiosprite = require('audiosprite');
const { readdirSync, writeFileSync, existsSync } = require('fs');
const { exec } = require('child_process');

(async () => {
    console.log('asdad')
    return new Promise((resolve, reject) => {
        const outputPath = path.join('assets', 'sounds');
        const inputPath = path.join('assets', 'sounds');

        console.log(outputPath)
        console.log(inputPath)
        if (!existsSync(inputPath)) {
            resolve();
            return;
        }
        const dirCont = readdirSync(inputPath);
        const slices = dirCont
            .filter((elm) => {
                return elm.match(/.*\.(mp3|ogg|wav|mp4)/gi);
            })
            .map((elm) => path.join(inputPath, elm));
        if (slices.length === 0) {
            resolve();
            return;
        }
        audiosprite(
            slices,
            {
                output: path.join(outputPath, 'spritemap'),
                export: 'mp3',
                format: 'jukebox',
                loop: 'theme',
                bitrate: '32',
            },
            (err, obj) => {
                if (err) reject(err);
                const jsonPath = path.join(outputPath, 'spritemap.json');
                writeFileSync(jsonPath, JSON.stringify(obj.spritemap, null, 2), 'utf8');
                exec(`npx prettier --write ${jsonPath}`);
                resolve();
            },
        );
    });
})()
