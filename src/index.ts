import "pixi-spine";
import { Assets } from "pixi.js";
import "./style.css";

import { lego, legoLogger } from '@armathai/lego';
import { MainView } from './views/main-view';

import { GameEvent } from './events/game';
import { Game } from './game';

import { sound } from '@pixi/sound';
import { startupCommand } from './commands/startup-command';

console.log(
    `%cPixiJS V7\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com %c❤️`,
    "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
    "color: #D81B60; font-weight: bold;",
    "color: #C2185B; font-weight: bold; text-decoration: underline;",
    "color: #ff66a1;",
);

legoLogger.start(lego, {});
lego.command.on(GameEvent.init, startupCommand);

const app = new Game();
window.game = app;

window.onload = async (): Promise<void> => {
    await loadGameAssets();
    document.body.appendChild(app.view);
    lego.event.emit(GameEvent.init);
    sound.play("bgm_groovy", { loop: true });
    app.stage.addChild(new MainView());
    lego.event.emit(GameEvent.start);
};

async function loadGameAssets(): Promise<void> {
    const manifest = {
        bundles: [
            {
                name: "items",
                assets: [
                    {
                        name: "items",
                        srcs: "./assets/atl_merge_items.json",
                    },

                ],
            },
            {
                name: 'cell_bg',
                assets: [
                    {
                        alias: 'cell_bg',
                        src: './assets/Field_BG_mystery_version.png',
                    },
                ],
            },
            {
                name: 'ui',
                assets: [
                    {
                        alias: 'logo',
                        src: './assets/Logo_RT.png',
                    },
                    {
                        alias: 'balance_bar',
                        src: './assets/balance_bar.png',
                    },
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

    await Assets.init({ manifest });
    await Assets.loadBundle(["items", "cell_bg", "ui", "fonts", "sounds"]);
    sound.add("bgm_groovy", "./assets/sounds/bgm_groovy.mp4")
}