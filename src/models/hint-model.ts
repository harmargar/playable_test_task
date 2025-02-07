import { HintState } from '../constants/states';
import { delayRunnable, removeRunnable } from '../utils';
import { CellModel } from './cell-model';
import { ObservableModel } from './observable-model';
import { store } from './store';

export class HintModel extends ObservableModel {
    private _state: HintState
    private _startRunable: Runnable;

    constructor() {
        super("HintModel");

        this.makeObservable('_state');
    }

    get state(): HintState {
        return this._state;
    }

    set state(value: HintState) {
        this._state = value;
    }

    public getCells(): CellModel[] {
        const itemsGrup: CellModel[][] = [];
        store.game.cells.forEach(cell => {
            if (!itemsGrup[cell.itemIndex]) {
                itemsGrup[cell.itemIndex] = [];
            }

            itemsGrup[cell.itemIndex].push(cell);
        })

        itemsGrup.sort(() => Math.random() - 0.5);

        return itemsGrup.find(group => group.length >= 2).slice(0, 2);
    }

    public stopTimer(): void {
        removeRunnable(this._startRunable);
        this._startRunable = null;
    }

    public updateTimer(): void {
        if (this._startRunable) {
            removeRunnable(this._startRunable);
            this._startRunable = null;
        }
        this._startTimer();
    }

    public initialize(): void {
        this.state = HintState.idle;
        this._startTimer();
    }

    public destroy(): void {
        this.stopTimer();
        this.state = HintState.hide;
        super.destroy();
    }

    private _startTimer(): void {
        this._startRunable = delayRunnable(4, () => {
            this.state = HintState.show;
        })
    }
}