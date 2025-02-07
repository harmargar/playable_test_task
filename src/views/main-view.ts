
import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getMainGridConfig } from '../configs/grid-configs';
import { GameEvent } from '../events/game';
import { delayRunnable } from '../utils';
import { EffectView } from './effect-view';
import { GameView } from './game-view';
import { UIView } from './ui-view';

export class MainView extends PixiGrid {
    private _effectView: EffectView;

    public constructor() {
        super();
        this._build();
        this.name = 'MainView';
        lego.event.on(GameEvent.resize, this.onResize, this);
    }

    public onResize(): void {
        this._effectView.updateSize();
        delayRunnable(0.05, () => {
            this.rebuild(this.getGridConfig());
        });
        // this._updateScale();
    }

    public getGridConfig(): ICellConfig {
        return getMainGridConfig();
    }

    private async _build(): Promise<void> {
        // this.addChild(new BackgroundView());
        this.setChild("main", new GameView());
        this.setChild("effect", this._effectView = new EffectView());
        this.setChild("main", new UIView());

        // game.parentLayer = foregroundGroup;
    }
}
