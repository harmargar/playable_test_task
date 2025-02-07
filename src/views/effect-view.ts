import { Container, Graphics } from 'pixi.js';

export class EffectView extends Container {
    private _context: Graphics;

    public constructor() {
        super();
        this.name = 'EffectView';
        // this._createBg();

        this.interactive = false;
        this.interactiveChildren = false;
    }

    public updateSize(): void {
        // this._context.destroy();
        // this._context = null;

        // this._createBg()

    }


    private _createBg(): void {
        const graphics = new Graphics();
        graphics.beginFill(0xff0000, 0.5);
        graphics.drawRect(0, 0, window.game.screen.width, window.game.screen.height);
        graphics.endFill();
        this.addChild(this._context = graphics);
    }


}
