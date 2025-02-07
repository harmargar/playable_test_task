import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Container, Point } from 'pixi.js';
import { getGameGridConfig } from '../configs/grid-configs';
import { GameModelEvent } from '../events/model';
import { CellViewEvent, GameViewEvent } from '../events/view';
import { CellModel } from '../models/cell-model';
import { lp } from '../utils';
import { CellVIew } from './cell-view';

export class GameView extends PixiGrid {
    private _cells: CellVIew[] = [];
    private _board: Container;
    public constructor() {
        super();
        this.name = 'GameView';

        lego.event.on(GameModelEvent.cellsUpdate, this._onCellsUpdate, this);
        lego.event.on(CellViewEvent.onPointerUp, this._onItemPointerUp, this);
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
            const cell = new CellVIew(cellModel);
            this._board.addChild(cell);
            this._cells.push(cell);
            cell.init()
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
            cell.setPosition(col * 165, row * 165);
        })
    }

    private _onItemPointerUp(cell: CellVIew, position: Point): void {
        const localPos = this._board.toLocal(position);
        const cell2 = this._getCellsByPos(localPos);
        if (cell !== cell2)
            lego.event.emit(GameViewEvent.mergeCells, cell, cell2)
    }

    private _getCellsByPos(pos: Point): CellVIew {
        return lp(this._getCellByPosL, this._getCellByPosP).call(this, pos)
    }

    _getCellByPosP(pos: Point): CellVIew {
        const row = Math.round(pos.x / 165);
        const col = Math.round(pos.y / 165);
        return this._cells.find(cell => cell.row == row && cell.col == col);
    }

    _getCellByPosL(pos: Point): CellVIew {
        const col = Math.round(pos.x / 165);
        const row = Math.round(pos.y / 165);
        return this._cells.find(cell => cell.row == row && cell.col == col);
    }
}
