import { lego } from '@armathai/lego';
import gsap from 'gsap';
import { IDestroyOptions, Point, Sprite, Texture } from 'pixi.js';
import { HintState } from '../constants/states';
import { HintModelEvent } from '../events/model';
import { HintModel } from '../models/hint-model';
import { getDisplayObjectByProperty } from '../utils';
import { GameView } from './game-view';

export class HintView extends Sprite {
    public constructor(private _model: HintModel) {
        super(Texture.from('Woman_red_nail_another-angle.png'));
        this.name = 'HintView';
        this.visible = false;
        this.anchor.set(0.7, 0.03)
        this.scale.set(0.9);
        this.angle = -45;
        lego.event.on(HintModelEvent.stateUpdate, this._onStateUpdate, this);

        this.interactive = false;
        this.interactiveChildren = false;
    }

    public destroy(options?: IDestroyOptions | boolean): void {
        gsap.killTweensOf(this);
        gsap.killTweensOf(this.scale);
        lego.event.off(HintModelEvent.stateUpdate, this._onStateUpdate, this);
        super.destroy(options);
    }

    private _onStateUpdate(state: HintState): void {
        switch (state) {
            case HintState.show:
                const cellModels = this._model.getCells();
                const gameView = <GameView>getDisplayObjectByProperty('name', "GameView");

                const cell1 = gameView.getCellViewByColAndRow(cellModels[0].col, cellModels[0].row);
                const cell2 = gameView.getCellViewByColAndRow(cellModels[1].col, cellModels[1].row);
                const pos1 = this.parent.toLocal(cell1.parent.toGlobal(cell1.position))
                const pos2 = this.parent.toLocal(cell2.parent.toGlobal(cell2.position))
                this.position.set(pos1.x, pos1.y);
                this.visible = true;
                this.alpha = 0;

                this._show(pos1, pos2);

                break;

            case HintState.hide:
                this.visible = false;
                gsap.killTweensOf(this);
                gsap.killTweensOf(this.scale);
                break;

            case HintState.idle:
                this.visible = false;
                gsap.killTweensOf(this);
                gsap.killTweensOf(this.scale);
                break;

            default:
                break;
        }
    }

    private _show(pos1: Point, pos2: Point): void {
        this.position.set(pos1.x, pos1.y);


        gsap.to(this, { alpha: 1, duration: 0.5, repeat: 0, delay: 0.5, ease: "sine.inOut" });
        gsap.to(this.scale, { x: 0.8, y: 0.8, duration: 0.7, delay: 0.7, repeat: 0, ease: "sine.inOut" });
        gsap.to(this, { x: pos2.x, y: pos2.y, duration: 1, delay: 1.9, repeat: 0, ease: "sine.inOut" });
        gsap.to(this.scale, { x: 0.9, y: 0.9, duration: 1, delay: 2.9, repeat: 0, ease: "sine.inOut" });
        gsap.to(this, { alpha: 0, duration: 1, repeat: 0, delay: 2.9, ease: "sine.inOut" }).eventCallback('onComplete', () => {
            this._show(pos1, pos2);
        });
    }

}
