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

    public getCellByColAndRow(col: number, row: number): CellModel {
        return this._cells.find(cell => cell.col == col && cell.row == row);
    }

    public getCellByUuId(uuid: string): CellModel {
        return this._cells.find(cell => cell.uuid == uuid);
    }

    public initialize(): void {
        const cells: CellModel[] = [];

        for (let i = 0; i < this._config.rows; i++) {
            for (let j = 0; j < this._config.cols; j++) {
                cells.push(new CellModel(i, j, Math.round(Math.random() * 27)));
            }
        }

        this.cells = cells;

        this.cells[0].itemIndex = 32;
        this.cells[1].itemIndex = 34;
    }
}