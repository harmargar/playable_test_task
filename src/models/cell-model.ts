import { ObservableModel } from './observable-model';

export class CellModel extends ObservableModel {

    constructor(private _row: number, private _col: number, private _index: number) {
        super("CellModel");
    }

    get row(): number {
        return this._row;
    }

    get col(): number {
        return this._col;
    }

    get index(): number {
        return this._index;
    }

    public initialize(): void {

    }
}