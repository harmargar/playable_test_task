import { ICellConfig } from '@armathai/pixi-grid';
import { Container } from 'pixi.js';
import { getBackgroundGridConfig } from '../configs/grid-configs';

export class BackgroundView extends Container {
    // private _bg: Sprite;

    public constructor() {
        super();
        this.name = 'BackgroundView';
        this._createBg();
    }

    public getGridConfig(): ICellConfig {
        return getBackgroundGridConfig();
    }

    private _createBg(): void {
        // const graphics = new Graphics();
        // // Rectangle
        // console.warn(window.game);
        // graphics.beginFill(0xffffff);
        // graphics.drawRect(0, 0, window.game.screen.width, window.game.screen.height);
        // graphics.endFill();
        // this.addChild(graphics);
    }
}
