import { gameConfig } from '../configs/game-config';
import { postRunnable } from '../utils';
import { BalanceModel } from './balance-model';
import { GameModel } from './game-model';
import { ObservableModel } from './observable-model';

class Store extends ObservableModel {
    private _game: GameModel;
    private _balance: BalanceModel

    public constructor() {
        super('Store');
        this.makeObservable("_game", "_balance");
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


    // GAME
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
}

export const store = new Store();
