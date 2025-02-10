import { lego } from '@armathai/lego';
import { sound } from '@pixi/sound';
import "pixi-spine";
import * as PIXI from "pixi.js";
import { startupCommand } from './commands/startup-command';
import { GameEvent } from './events/game';
import { Game } from './game';
import "./style.css";
import { MainView } from './views/main-view';

// legoLogger.start(lego, {});
lego.command.on(GameEvent.init, startupCommand);

const app = new Game();
window.game = app;

window.onload = async (): Promise<void> => {
    await loadGameAssets();
    await loadSounds();
    document.body.appendChild(app.view);
    lego.event.emit(GameEvent.init);
    let main: MainView;

    app.stage.addChild(main = new MainView());
    lego.event.emit(GameEvent.start);

    document.body.addEventListener('pointerdown', () => {
        lego.event.emit(GameEvent.documentBodyPointerDown);
    });

    document.body.addEventListener('pointerup', () => {
        lego.event.emit(GameEvent.documentBodyPointerUp);
    });
};

async function loadGameAssets(): Promise<void> {
    const manifest = {
        bundles: [
            {
                name: "items",
                assets: [
                    {
                        name: "items",
                        srcs: "./assets/assets.json",
                    }
                ],
            },

            {
                name: 'ui',
                assets: [
                    {
                        alias: 'logo',
                        src: './assets/Logo_RT.png',
                    }
                ],
            },
            {
                name: 'fonts',
                assets: [
                    {
                        alias: 'Tobi_Greek',
                        src: './assets/fonts/Tobi_Greek_Cyrillic_Regular.woff',
                    },
                ],
            },
        ],
    };

    await PIXI.Assets.init({ manifest });
    await PIXI.Assets.loadBundle(["items", "ui", "fonts"]);
    // sound.add("bgm_groovy", "./assets/sounds/bgm_groovy.mp4");
}


async function loadSounds(): Promise<void> {
    const response = await fetch('./assets/sounds/spritemap.json');
    const spritemap = await response.json();

    sound.add('spritemap', {
        url: "./assets/sounds/spritemap.mp3",
        sprites: spritemap,
    });
}