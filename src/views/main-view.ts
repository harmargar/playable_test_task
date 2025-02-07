
import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import gsap from 'gsap';
import { getMainGridConfig } from '../configs/grid-configs';
import { StorStates } from '../constants/states';
import { GameEvent } from '../events/game';
import { StoreEvent } from '../events/model';
import { HintModel } from '../models/hint-model';
import { delayRunnable } from '../utils';
import { CTAView } from './cta-view';
import { EffectView } from './effect-view';
import { GameView } from './game-view';
import { HintView } from './hint-view';
import { UIView } from './ui-view';

export class MainView extends PixiGrid {
    private _effectView: EffectView;
    private _ctaView: CTAView;
    private _uiView: UIView;
    private _game: GameView;
    private _hint: HintView;

    public constructor() {
        super();
        this._build();
        this.name = 'MainView';
        lego.event.on(GameEvent.resize, this.onResize, this);

        lego.event.on(StoreEvent.hintUpdate, this._onHintUpdate, this);
        lego.event.on(StoreEvent.stateUpdate, this._onStorStateUpdate, this);
        // lego.event.on(CtaViewEvent.playAgainClick, this._onPlayAgainClick, this);
    }

    public onResize(): void {
        this._effectView.updateSize();
        delayRunnable(0.05, () => {
            this.rebuild(this.getGridConfig());
        });
    }

    public getGridConfig(): ICellConfig {
        return getMainGridConfig();
    }

    private async _build(): Promise<void> {
        this.setChild("main", this._game = new GameView());
        this.setChild("effect", this._effectView = new EffectView());
        this.setChild('main', this._ctaView = new CTAView());
        this.setChild("main", this._uiView = new UIView());

        this._ctaView.visible = false;
    }

    private _onHintUpdate(hintModel: HintModel): void {
        if (!!hintModel)
            this.addChild(this._hint = new HintView(hintModel));
        else {
            this.removeChild(this._hint);
            this._hint.destroy();
            this._hint = null;
        }

    }

    private _onStorStateUpdate(state: StorStates): void {
        switch (state) {
            case StorStates.cta:
                this._ctaView.visible = true;
                this._ctaView.alpha = 0;
                gsap.to(this._ctaView, { alpha: 1, duration: 0.5, repeat: 0, ease: 'sine' });
                gsap.to(this._uiView, { alpha: 0, duration: 0.5, repeat: 0, ease: 'sine' });
                break;

            case StorStates.game:
                this._ctaView.visible = false;
                this._ctaView.alpha = 0;
                this._uiView.alpha = 1;
                break;

            default:
                break;
        }
    }
}
