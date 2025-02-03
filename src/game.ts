import { lego } from '@armathai/lego';
import { Application } from '@pixi/app';
import { GameEvent } from './events/game';
import { postRunnable } from './utils';

// import { LocalForage } from './storage/local-forage';
// import { postRunnable } from './utils';

export class Game extends Application<HTMLCanvasElement> {
    public constructor() {
        super({ resizeTo: window, backgroundColor: 0xcdcdcd });
        document.body.appendChild(this.view);
        // this.loader
        //     .add('chick', chick)
        //     .add('duck', duck)
        //     .add('owl', owl)
        //     .add('parrot', parrot)
        //     .add('pixel', pixel)
        //     .load(() => {
        //         this.stage.addChild(new MainView());
        //     });

        this._setResizeListener()

        this._init();
    }

    private _init() {
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
