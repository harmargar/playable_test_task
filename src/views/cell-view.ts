import { lego } from '@armathai/lego';
import { Emitter } from '@pixi/particle-emitter';
import { Assets, Container, FederatedPointerEvent, Point, Sprite } from 'pixi.js';
import { CoinParticleConfig } from '../configs/particles-config';
import { CellStates } from '../constants/states';
import { CellModelEvent } from '../events/model';
import { CellViewEvent } from '../events/view';
import { CellModel } from '../models/cell-model';
import { delayRunnable, getDisplayObjectByProperty, makeAnimation, makeSprite } from '../utils';
import { ItemView } from './item-view';

export class CellVIew extends Container {
    private _bg: Sprite;
    private _item: ItemView;
    private _col: number;
    private _row: number;
    private _itemIndex: number;

    constructor(private _cellModel: CellModel) {
        super();

        const { col, row, itemIndex } = _cellModel;
        this._col = col;
        this._row = row
        this._itemIndex = itemIndex

        lego.event.on(CellModelEvent.itemIndexUpdate, this._onItemUpdate, this);
        lego.event.on(CellModelEvent.stateUpdate, this._onStateUpdate, this);
    }

    get col(): number {
        return this._col;
    }

    get row(): number {
        return this._row;
    }

    public init(): void {
        this._buildBg();
        this._buildItem();
    }

    public setPosition(x: number, y: number): void {
        this.position.set(x, y);
        // this._item.position.set(x, y);
    }

    private _onItemUpdate(carentValue: number, preValue: number, uuId: string): void {
        if (this._cellModel.uuid !== uuId)
            return
        this._item?.destroy();
        this._item = null;
        this._itemIndex = carentValue;
        this._buildItem();



        // Ticker.shared.add((delta) => {
        //     emitter.update(delta * 0.001)
        // });
    }

    private _onStateUpdate(state: CellStates, preState: CellStates, uuid: string): void {
        if (uuid != this._cellModel.uuid)
            return
        switch (state) {
            case CellStates.marge:
                this._onStateMarge();
                break;
            case CellStates.colect:
                this._onStateColect();
                break;
            default:
                break;
        }
    }

    private _onStateMarge(): void {
        const conf = {
            speed: 0.5,
            loop: false,
            anchor: new Point(0.5, 0.5),
            scale: new Point(0.5, 0.5),
        }
        const animatedSprite = makeAnimation(
            {
                frames: Object.keys(Assets.get("explosion").textures),
                ...conf
            })


        const animatedSprite1 = makeAnimation(
            {
                frames: Object.keys(Assets.get("merge").textures),
                ...conf
            })

        animatedSprite.play();
        animatedSprite1.play();

        const effectView = <Container>getDisplayObjectByProperty('name', "EffectView");
        const { a: scale } = this.worldTransform;

        effectView.addChild(animatedSprite, animatedSprite1);

        const { x, y } = effectView.toLocal(this.toGlobal({ x: 0, y: 0 }));

        animatedSprite1.position.set(x, y);
        animatedSprite.position.set(x, y);
        animatedSprite.scale.set(scale);
        animatedSprite1.scale.set(scale);

        animatedSprite.onComplete = () => {
            lego.event.emit(CellViewEvent.onMargeEffectComplete, this._cellModel.uuid);
            effectView.removeChild(animatedSprite);
            animatedSprite.destroy();

        }

        animatedSprite1.onComplete = () => {
            effectView.removeChild(animatedSprite1);
            animatedSprite1.destroy();
        }
    }

    private _onStateColect(): void {
        const effectView = <Container>getDisplayObjectByProperty('name', "EffectView");
        const particleContainer = new Container();
        const { a: scale } = this.worldTransform;
        effectView.addChild(particleContainer);
        const { x, y } = effectView.toLocal(this.toGlobal({ x: 0, y: 0 }));
        particleContainer.position.set(x, y);
        const emitter = new Emitter(particleContainer, CoinParticleConfig);
        emitter.emit = true;

        delayRunnable(emitter.emitterLifetime, () => {
            emitter.emit = false;
            emitter.destroy();
            effectView.removeChild(particleContainer);
            particleContainer.destroy();

            lego.event.emit(CellViewEvent.onColectEffectComplete, this._cellModel.uuid);
        })
    }



    private _buildBg(): void {
        const bg = makeSprite("cell_bg");
        bg.anchor.set(0.5);
        this.addChild(this._bg = bg);
    }

    private _buildItem(): void {
        if (this._itemIndex == -1)
            return
        const item = new ItemView(this._itemIndex)
        item.scale.set(this._getItemScale(item));
        // item.position.set(this.position.x, this.position.y);
        this.addChild(this._item = item);

        item.on('onPointerDown', this._onItemPointerDown, this);
        item.on('onPointerUp', this._onItemPointerUp, this);
    }

    private _onItemPointerDown(): void {
        const effectView = <Container>getDisplayObjectByProperty('name', "EffectView");
        const { a: scale } = this._item.worldTransform;

        effectView.addChild(this._item);
        effectView.interactiveChildren = true;
        this._item.scale.set(scale);

        lego.event.emit(CellViewEvent.onItemClick, this);
    }

    private _onItemPointerUp(e: FederatedPointerEvent): void {
        this.addChild(this._item);
        this._item.scale.set(this._getItemScale(this._item))
        lego.event.emit(CellViewEvent.onPointerUp, this, e.global);
    }

    private _getItemScale(item: Container): number {
        const { width: iWidth, height: iHeight, scale } = item;
        const { width: bWidth, height: bHeight } = this._bg;

        return Math.min((bWidth - 20) / (iWidth / scale.x), (bHeight - 20) / (iHeight / scale.y));
    }
}