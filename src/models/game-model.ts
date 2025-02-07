import { CellModel } from './cell-model';
import { ObservableModel } from './observable-model';

export class GameModel extends ObservableModel {
    private _cells: CellModel[]
    private _margeCount: number = 0;

    constructor(private _config: GameConfig) {
        super("GameModel");

        this.makeObservable('_cells', '_margeCount');
    }

    get cells(): CellModel[] {
        return this._cells;
    }

    set cells(value: CellModel[]) {
        this._cells = value;
    }

    get margeCount(): number {
        return this._margeCount;
    }

    set margeCount(value: number) {
        this._margeCount = value;
    }

    public getCellByColAndRow(col: number, row: number): CellModel {
        return this._cells.find(cell => cell.col == col && cell.row == row);
    }

    public getCellByUuId(uuid: string): CellModel {
        return this._cells.find(cell => cell.uuid == uuid);
    }

    public destroy(): void {
        this._cells = null;
        this._margeCount = 0;
        super.destroy()
    }

    public updateCells(): void {
        this.cells.forEach(cell => {
            cell.itemIndex = Math.round(Math.random() * 27);
        })
    }

    public initialize(): void {
        const cells: CellModel[] = [];
        this.margeCount = 0;

        for (let i = 0; i < this._config.rows; i++) {
            for (let j = 0; j < this._config.cols; j++) {
                cells.push(new CellModel(i, j, Math.round(Math.random() * 27)));
            }
        }

        this.cells = cells;

        // this.cells[0].itemIndex = 32;
        // this.cells[1].itemIndex = 34;
    }
}