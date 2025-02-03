import { Container, FederatedPointerEvent, Sprite } from 'pixi.js';
import { ITEMS_INDEX } from '../configs/items-config';
import { makeSprite } from '../utils';

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

    private _makeInteractive(): void {
        this.eventMode = 'static'; // Включаем события в PixiJS 7
        this.cursor = 'pointer'; // Меняем курсор на pointer

        this.on('pointerdown', this._onPointerDown, this);
        this.on('pointerup', this._onPointerUp, this);
        this.on('pointerupoutside', this._onPointerUp, this);

        // Убеждаемся, что stage тоже реагирует на события
        if (window.game) {
            window.game.stage.eventMode = 'static';
            window.game.stage.hitArea = window.game.screen;
            window.game.stage.on('pointermove', this._onPointerMove, this);
        } else {
            console.error('window.game is not defined!');
        }
    }

    private _onPointerDown(e: FederatedPointerEvent): void {
        this._isDragging = true;
        // this.alpha = 0.5;
        // const oldScale = this.scale
        // this.scale.set(oldScale.x + 0.2, oldScale.y + 0.2);

        // Запоминаем смещение курсора относительно объекта
        const localPos = e.getLocalPosition(this);
        this._dragOffset.x = localPos.x;
        this._dragOffset.y = localPos.y;
    }

    private _onPointerMove(e: FederatedPointerEvent): void {
        if (!this._isDragging) return;

        // Получаем глобальную позицию курсора
        const globalPos = e.global;

        // Переводим в локальные координаты родителя
        const newPosition = this.parent.toLocal(globalPos);

        // Перемещаем с учетом изначального смещения
        this.position.set(newPosition.x - this._dragOffset.x, newPosition.y - this._dragOffset.y);
    }

    private _onPointerUp(): void {
        this._isDragging = false;
        this.position.set(0, 0);
        this.alpha = 1;
    }

    public destroy(): void {
        if (window.game) {
            window.game.stage.off('pointermove', this._onPointerMove, this);
        }
        super.destroy();
    }
}
