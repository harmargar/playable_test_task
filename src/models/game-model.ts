import { CellModel } from './cell-model';
import { ObservableModel } from './observable-model';

export class GameModel extends ObservableModel {
    private _cells: CellModel[]

    constructor(private _config: GameConfig) {
        super("GameModel");

        this.makeObservable('_cells');
    }

    get cells(): CellModel[] {
        return this._cells;
    }

    set cells(value: CellModel[]) {
        this._cells = value;
    }

    public initialize(): void {
        const cells: CellModel[] = [];
        this._config.cells.forEach((rowItems, row) => {
            rowItems.forEach((itemIndex, col) => {
                cells.push(new CellModel(row, col, itemIndex));
            })
        });

        this.cells = cells;
    }
}