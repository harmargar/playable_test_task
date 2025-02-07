import { gameConfig } from '../configs/game-config';
import { StorStates } from '../constants/states';
import { postRunnable } from '../utils';
import { BalanceModel } from './balance-model';
import { GameModel } from './game-model';
import { HintModel } from './hint-model';
import { ObservableModel } from './observable-model';

class Store extends ObservableModel {
    private _game: GameModel;
    private _balance: BalanceModel;
    private _hint: HintModel;
    private _state: StorStates

    public constructor() {
        super('Store');
        this.makeObservable("_game", "_balance", "_hint", "_state");

        this._state = StorStates.idel;
    }

    public get state(): StorStates {
        return this._state;
    }

    public set state(value: StorStates) {
        this._state = value;
    }

    public get game(): GameModel {
        return this._game;
    }

    public set game(value) {
        this._game = value;
    }

    public get balance(): BalanceModel {
        return this._balance;
    }

    public set balance(value) {
        this._balance = value;
    }

    public get hint(): HintModel {
        return this._hint;
    }

    public set hint(value) {
        this._hint = value;
    }

    // GAME
    public initializeGameModel(): void {
        this._game = new GameModel(gameConfig);
        postRunnable(() => {
            this._game.initialize();
        });
    }

    public destroyGameModel(): void {
        this._game.destroy();
        this._game = null;
    }


    // BALANCE
    public initializeBalanceModel(): void {
        this._balance = new BalanceModel();
        postRunnable(() => {
            this._balance.initialize(gameConfig.startingBalance);
        });
    }

    public destroyBalanceModel(): void {
        this._balance?.destroy();
        this._balance = null;
    }


    // HINT
    public initializeHintModel(): void {
        this._hint = new HintModel();
        postRunnable(() => {
            this._hint.initialize();
        });
    }

    public destroyHintModel(): void {
        this._hint?.destroy();
        this._hint = null;
    }
}

export const store = new Store();
