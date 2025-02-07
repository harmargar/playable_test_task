import { lego, legoLogger } from '@armathai/lego';
import { sound } from '@pixi/sound';
import "pixi-spine";
import * as PIXI from "pixi.js";
import { startupCommand } from './commands/startup-command';
import { GameEvent } from './events/game';
import { Game } from './game';
import "./style.css";
import { MainView } from './views/main-view';

legoLogger.start(lego, {});
lego.command.on(GameEvent.init, startupCommand);

const app = new Game();
window.game = app;

window.onload = async (): Promise<void> => {
    await loadGameAssets();
    document.body.appendChild(app.view);
    lego.event.emit(GameEvent.init);
    let main: MainView;
    // sound.play("bgm_groovy", { loop: true });
    app.stage.addChild(main = new MainView());
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
                    {
                        alias: 'coins_01.png',
                        src: './assets/coins_01.png',
                    },
                    {
                        alias: 'coins_02.png',
                        src: './assets/coins_02.png',
                    },
                    {
                        alias: 'coins_03.png',
                        src: './assets/coins_03.png',
                    },
                    {
                        alias: 'coins_4.png',
                        src: './assets/coins_4.png',
                    },
                    {
                        alias: 'coins_5.png',
                        src: './assets/coins_5.png',
                    },
                    {
                        alias: 'lightning_1.png',
                        src: './assets/lightning_1.png',
                    },
                    {
                        alias: 'lightning_2.png',
                        src: './assets/lightning_2.png',
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
            {
                name: 'effects',
                assets: [
                    {
                        name: "glitter",
                        srcs: "./assets/glitter.json",
                    },
                    {
                        name: "merge",
                        srcs: "./assets/merge.json",
                    },
                    {
                        name: "explosion",
                        srcs: "./assets/explosion.json",
                    },
                ],
            },
        ],
    };

    await PIXI.Assets.init({ manifest });
    await PIXI.Assets.loadBundle(["items", "cell_bg", "ui", "fonts", "sounds", "effects"]);
    sound.add("bgm_groovy", "./assets/sounds/bgm_groovy.mp4")
}