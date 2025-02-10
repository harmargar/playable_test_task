import { lego } from '@armathai/lego';
import { Application } from '@pixi/app';
import gsap from 'gsap';
import { Ticker } from 'pixi.js';
import { GameEvent } from './events/game';
import { postRunnable } from './utils';

export class Game extends Application<HTMLCanvasElement> {
    private _interaction = false;
    private _revealed = true;

    public constructor() {
        super({ resizeTo: window, backgroundColor: 0xcdcdcd });
        document.body.appendChild(this.view);
        this._setResizeListener()
        this._init();


    }

    public get interaction(): boolean {
        return this._interaction;
    }

    private _init() {
        this._addReadyEventCallback();
        this._addVisibleChangeCallback();
    }

    private _addVisibleChangeCallback(): void {
        let hidden: string;
        let visibilityChange: string;
        if (typeof document.hidden !== 'undefined') {
            hidden = 'hidden';
            visibilityChange = 'visibilitychange';
        } else if (typeof document.msHidden !== 'undefined') {
            hidden = 'msHidden';
            visibilityChange = 'msvisibilitychange';
        } else if (typeof document.webkitHidden !== 'undefined') {
            hidden = 'webkitHidden';
            visibilityChange = 'webkitvisibilitychange';
        }

        const getVisibility = (): boolean => {
            return !!!document[hidden as keyof typeof document];
        };
        // Handle page visibility change
        document.addEventListener(visibilityChange, () => this._onVisibilityChange(getVisibility()), false);
        this._onVisibilityChange(getVisibility());
    }

    private _onVisibilityChange(isVisible: boolean): void {
        isVisible ? this._resume() : this._pause();
    }

    private _pause(): void {
        console.warn('pause');
        const ticker = Ticker.shared;
        ticker.started && ticker.stop();
        gsap.ticker.sleep();
        lego.event.emit(GameEvent.pause);
    }

    private _resume(): void {
        console.warn('resume');
        const ticker = Ticker.shared;
        !ticker.started && ticker.start();
        gsap.ticker.wake();
        lego.event.emit(GameEvent.resume);
    }


    private _addReadyEventCallback(): void {
        window.addEventListener('DOMContentLoaded', () => this._onDOMContentLoaded());
    }


    private _onDOMContentLoaded(): void {
        this._init();
        this._addFirstInteractionCallback();
    }


    private _addFirstInteractionCallback(): void {
        const firstInteract = (): void => {
            window.removeEventListener('touchstart', firstInteract);
            window.removeEventListener('mousedown', firstInteract);
            this._interaction = true;
            postRunnable(() => this._onFirstInteraction());
        };
        window.addEventListener('touchstart', firstInteract);
        window.addEventListener('mousedown', firstInteract);
    }


    private _onFirstInteraction(): void {
        this._interaction = true;
        lego.event.emit(GameEvent.firstInteraction);
    }


    private _setResizeListener(): void {
        window.addEventListener('resize', () => {
            postRunnable(() => {
                lego.event.emit(GameEvent.resize);
            })
        })
    }
}

// window.Game = Game;
