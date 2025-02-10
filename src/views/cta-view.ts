import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import gsap from 'gsap';
import { Container, Sprite, Text, Texture } from 'pixi.js';
import { getCTAGridConfig } from '../configs/grid-configs';
import { CtaViewEvent } from '../events/view';
import { makeText } from '../utils';
import { LogoView } from './logo-view';

export class CTAView extends PixiGrid {
    private _button: Container;

    public constructor() {
        super();
        this.name = 'CTAView';
        this._init();
    }

    public getGridConfig(): ICellConfig {
        return getCTAGridConfig();
    }

    public rebuild(config?: ICellConfig): void {
        gsap.killTweensOf(this._button.scale);
        super.rebuild(config)

        this._addShaking();
    }

    public show(): void {

    }

    private _init(): void {
        const logo = new LogoView();
        const bg = new Sprite(Texture.WHITE);
        bg.interactive = true;

        this.setChild('bg', bg);
        this.setChild("logo", logo);
        this.setChild('text', this._buildText());
        this.setChild('button', this._button = this._buildButton());
        this._addShaking()
    }

    private _buildText(): Text {
        const text = makeText(
            {
                text: 'You win!',
                style:
                {
                    align: 'center',
                    fontSize: 120,
                    fontFamily: "Tobi_Greek",
                    fill: 0xfec913,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    stroke: 0x0000,
                    strokeThickness: 2
                }
            });

        return text;
    }

    private _buildButton(): Container {
        const buttonBg = new Sprite(Texture.from('cya_button.png'));
        buttonBg.anchor.set(0.5);
        const buttonText = makeText({
            text: 'Play Again',
            style:
            {
                align: 'center',
                fontSize: 30,
                fontFamily: "Tobi_Greek",
                fill: 0xffffff,
                fontStyle: 'oblique',
                fontWeight: 'bold',
                stroke: 0x0000,
                strokeThickness: 2
            }
        })
        const button = new Container();
        button.addChild(buttonBg, buttonText);
        button.interactive = true;
        button.on('pointerdown', () => {
            lego.event.emit(CtaViewEvent.playAgainClick);
        });

        return button;
    }

    private _addShaking(): void {
        const { x, y } = this._button.scale;
        gsap.to(this._button.scale, { x: x - 0.05, y: y - 0.05, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' })

    }
}
