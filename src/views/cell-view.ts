import { Container, Sprite } from 'pixi.js';
import { makeSprite } from '../utils';
import { ItemView } from './item-view';

export class CellVIew extends Container {
    private _bg: Sprite;

    constructor(private _row: number, private _col: number, private _index: number) {
        super();

        this._init();
    }

    get col(): number {
        return this._col;
    }

    get row(): number {
        return this._row;
    }

    private _init(): void {
        this._buildBg();
        this._buildItem();
    }

    private _buildBg(): void {
        const bg = makeSprite("cell_bg");
        bg.anchor.set(0.5);
        this.addChild(this._bg = bg);

    }

    private _buildItem(): void {
        const sprite = new ItemView(this._index)
        sprite.scale.set(this._getItemScale(sprite));
        this.addChild(sprite);
    }

    private _getItemScale(item: Container): number {
        const { width: iWidth, height: iHeight } = item;
        const { width: bWidth, height: bHeight } = this._bg;

        return Math.min((bWidth - 20) / iWidth, (bHeight - 20) / iHeight);
    }
}