import { CellStates } from '../constants/states';
import { ObservableModel } from './observable-model';

export class CellModel extends ObservableModel {

    private _state: CellStates = CellStates.idel

    constructor(private _row: number, private _col: number, private _itemIndex: number) {
        super("CellModel");

        this.makeObservable('_itemIndex', "_state");
    }

    get row(): number {
        return this._row;
    }

    get col(): number {
        return this._col;
    }

    get itemIndex(): number {
        return this._itemIndex;
    }

    set itemIndex(value: number) {
        this._itemIndex = value;
    }

    get state(): CellStates {
        return this._state;
    }

    set state(value: CellStates) {
        this._state = value;
    }

    public initialize(): void {
        //
    }
}