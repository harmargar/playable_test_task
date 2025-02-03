import { Sprite, Texture } from 'pixi.js';

export class LogoView extends Sprite {
    constructor() {
        super(Texture.from('logo'));
    }
}