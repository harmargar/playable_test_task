
import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getMainGridConfig } from '../configs/grid-configs';
import { GameEvent } from '../events/game';
import { delayRunnable } from '../utils';
import { GameView } from './game-view';
import { UIView } from './ui-view';

export class MainView extends PixiGrid {
    public constructor() {
        super();
        this._build();
        this.name = 'MainView';
        lego.event.on(GameEvent.resize, this.onResize, this);
    }

    public onResize(): void {
        delayRunnable(0.05, () => {
            this.rebuild(this.getGridConfig());
        });
        // this._updateScale();
    }

    public getGridConfig(): ICellConfig {
        return getMainGridConfig();
    }

    private async _build(): Promise<void> {
        this._updateScale();



        // this.addChild(new BackgroundView());
        this.setChild("main", new GameView());
        this.setChild("main", new UIView());


    }

    private _updateScale(): void {
        // this.scale.set(game.viewScale);
    }
}
