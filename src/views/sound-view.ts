import { lego } from '@armathai/lego';
import { Container, Sprite } from 'pixi.js';
import { SoundState } from '../constants/states';
import { SoundModelEvent } from '../events/model';
import { SoundViewEvent } from '../events/view';
import { makeSprite } from '../utils';

export class SoundView extends Container {
    private _on: Sprite;
    private _off: Sprite;

    constructor() {
        super();
        this.name = "SoundView";

        this._init();

        lego.event.on(SoundModelEvent.stateUpdate, this._onStateUpdate, this);
    }

    private _onStateUpdate(state: SoundState): void {

        switch (state) {
            case SoundState.off:
                this._on.visible = false;
                this._off.visible = true;
                break;

            case SoundState.on:
                this._on.visible = true;
                this._off.visible = false;
                break;

            case SoundState.idle:
                this._on.visible = false;
                this._off.visible = true;
                break;

            default:
                break;
        }
    }

    private _init(): void {
        this._on = this._buildButton('sound_on.png');
        this._off = this._buildButton('sound_off.png');

        this.interactive = true;
        this.on('pointerdown', this._onClick, this);
    }

    private _onClick(): void {
        lego.event.emit(SoundViewEvent.onClick);
    }

    private _buildButton(texture: string): Sprite {
        const button = makeSprite(texture);
        this.addChild(button);
        button.visible = false;
        return button;
    }
}