import { lego } from '@armathai/lego';
import { Container, Point, Text } from 'pixi.js';
import { BalanceModelEvent } from '../events/model';
import { makeSprite, makeText } from '../utils';

export class BalanceView extends Container {
    private _text: Text;

    constructor() {
        super()
        this._init();

        lego.event.on(BalanceModelEvent.valueUpdate, this._onBalanceUpdate, this);
    }

    private _init() {
        this._buildSprite();
        this._buildText();
    }

    private _buildSprite(): void {
        const sprite = makeSprite({ texture: "balance_bar.png", anchor: new Point(0.7, 0.45) });
        this.addChild(sprite);
    }

    private _buildText(): void {
        const text = makeText({ text: '0', style: { align: 'center', fontSize: 38, fontFamily: "Tobi_Greek", fontWeight: '900', fill: 0x9f5847 } });
        this.addChild(this._text = text);
    }

    private _onBalanceUpdate(value: number): void {
        this._text.text = value;
    }
}