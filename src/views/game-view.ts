import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Container } from 'pixi.js';
import { getGameGridConfig } from '../configs/grid-configs';
import { GameModelEvent } from '../events/model';
import { CellModel } from '../models/cell-model';
import { lp } from '../utils';
import { CellVIew } from './cell-view';

export class GameView extends PixiGrid {
    private _cells: CellVIew[] = [];
    private _board: Container;
    public constructor() {
        super();
        this.name = 'GameView';

        lego.event.on(GameModelEvent.cellsUpdate, this._onCellsUpdate, this)
    }

    public getGridConfig(): ICellConfig {
        return getGameGridConfig();
    }

    public rebuild(config?: ICellConfig): void {
        this._cellsPositonsUpdate();
        super.rebuild(config);
    }

    private _onCellsUpdate(cells: CellModel[]): void {
        this._board = new Container();
        cells.forEach(cellModel => {
            const { row, col, index: itemIndex } = cellModel;
            const cell = new CellVIew(row, col, itemIndex);
            this._board.addChild(cell);
            this._cells.push(cell);
        })
        this._cellsPositonsUpdate();
        this.setChild("board", this._board);
    }

    private _cellsPositonsUpdate(): void {
        lp(this._onCellsRebuildToL, this._onCellsRebuildToP).call(this);
    }

    private _onCellsRebuildToP(): void {
        this._cells.forEach(cell => {
            const { col, row } = cell;
            cell.position.set(row * 165, col * 165);
        })
    }

    private _onCellsRebuildToL(): void {
        this._cells.forEach(cell => {
            const { col, row } = cell;
            cell.position.set(col * 165, row * 165);
        })
    }
}
