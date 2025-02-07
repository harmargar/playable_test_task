import { Container, FederatedPointerEvent, Sprite } from 'pixi.js';
import { CLIME_ITEMS, ITEMS_INDEX } from '../configs/items-config';
import { getDisplayObjectByProperty, makeSprite } from '../utils';

export class ItemView extends Container {
    private _sprite: Sprite;
    private _isDragging: boolean = false;
    private _dragOffset: { x: number; y: number } = { x: 0, y: 0 };

    constructor(private _index: number) {
        super();
        this._init();
    }

    private _init(): void {
        this._buildSprite();
        this._makeInteractive();
    }

    private _buildSprite(): void {
        const sprite = makeSprite(ITEMS_INDEX[this._index]);
        sprite.anchor.set(0.5);
        this.addChild((this._sprite = sprite));
    }

    // private _buildTile(): void {

    // }

    private _makeInteractive(): void {
        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.on('pointerdown', this._onPointerDown, this);
        this.on('pointerup', this._onPointerUp, this);
        this.on('pointerupoutside', this._onPointerUp, this);
        if (window.game) {
            window.game.stage.eventMode = 'static';
            window.game.stage.hitArea = window.game.screen;
            window.game.stage.on('pointermove', this._onPointerMove, this);
        } else {
            console.error('window.game is not defined!');
        }
    }

    private _onPointerDown(e: FederatedPointerEvent): void {
        if (CLIME_ITEMS.find((index) => index == this._index)) {
            this.emit('onPointerDown');
            return;
        }
        this.emit('onPointerDown');
        this._isDragging = true;
        const globalPos = e.global;
        const newPosition = this.parent.toLocal(globalPos);
        this.position.set(newPosition.x, newPosition.y);
    }

    private _onPointerMove(e: FederatedPointerEvent): void {
        if (!this._isDragging) return;
        const globalPos = e.global;
        const newPosition = this.parent.toLocal(globalPos);
        this.position.set(newPosition.x - this._dragOffset.x, newPosition.y - this._dragOffset.y);
    }

    private _onPointerUp(e: FederatedPointerEvent): void {
        if (!this._isDragging) return;
        this._isDragging = false;
        this.position.set(0, 0);
        this.alpha = 1;
        const effectView = <Container>getDisplayObjectByProperty('name', "EffectView");
        effectView.interactiveChildren = false;
        this.emit('onPointerUp', e);
    }

    public destroy(): void {
        if (window.game) {
            window.game.stage.off('pointermove', this._onPointerMove, this);
        }
        super.destroy();
    }
}
