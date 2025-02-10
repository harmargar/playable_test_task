import { lego } from '@armathai/lego';
import { sound } from '@pixi/sound';
import { utils } from 'pixi.js';
import { CellStates, SoundState } from '../constants/states';
import { GameEvent } from '../events/game';
import { CellModelEvent, SoundModelEvent } from '../events/model';
import { CellViewEvent, CtaViewEvent } from '../events/view';
import { postRunnable } from '../utils';

export class SoundObservant {
    public constructor() {
        this._init();
    }

    private _init(): void {
        lego.event.on(GameEvent.pause, this._pause, this).on(GameEvent.resume, this._resume, this);
        lego.event.on(CellModelEvent.stateUpdate, this._onCellStateUpdate, this);
        lego.event.on(CellViewEvent.onItemClick, this._onItemClick, this);
        lego.event.on(CtaViewEvent.playAgainClick, this._onplayAgainClick, this);
        lego.event.on(SoundModelEvent.stateUpdate, this._onStateUpdate, this);
        postRunnable(() => {
            if (game.interaction) {
                this._playLoop();
            } else {
                lego.event.once(GameEvent.firstInteraction, this._playLoop, this);
            }
        });
    }

    private _onStateUpdate(state: SoundState): void {
        switch (state) {
            case SoundState.on:
                this._unmute();
                break;
            case SoundState.off:
                this._mute();
                break

            default:
                this._unmute();
                break;
        }
    }


    private _onplayAgainClick(state: CellStates): void {
        this._play('wood_button_tap_03');
    }

    private _onItemClick(state: CellStates): void {
        this._play('collect_item');
    }

    private _onCellStateUpdate(state: CellStates): void {

        switch (state) {
            case CellStates.colect:
                this._play('coinsb_boom');
                break;

            case CellStates.marge:
                this._play('merge_expedition_energy_field');
                this._play('merge_merge_energy_field');
                break;

            default:
                break;
        }
    }

    private _playLoop(): void {
        this._play('bgm_groovy', 0.5, true);
    }

    private _onSoundMuteUpdate(mute: boolean): void {
        mute ? this._mute() : this._unmute();
    }

    private _unmute(): void {
        sound.unmuteAll();
    }

    private _mute(): void {
        sound.muteAll();
    }

    private _pause(): void {
        (!utils.isMobile.apple.device || sound.useLegacy) && sound.pauseAll();
    }

    private _resume(): void {
        (!utils.isMobile.apple.device || sound.useLegacy) && sound.resumeAll();
    }

    private _play(
        sprite: string,
        volume: number = 1,
        loop: boolean = false
    ): import('@pixi/sound').IMediaInstance | Promise<import('@pixi/sound').IMediaInstance> {
        return sound.play('spritemap', { sprite, volume, loop });
    }
}
