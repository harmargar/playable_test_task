type Point = import("pixi.js").Point;
type ITextStyle = import("pixi.js").ITextStyle
type TextStyle = import("pixi.js").TextStyle

// type ButtonConfig = {
//     input?: ButtonInputConfig;
//     states?: ButtonStatesConfig;
// };

// type ButtonInputConfig = {
//     name?: string;
//     area?: PIXI.IHitArea;
// };

// type ButtonStatesConfig = {
//     up?: ButtonStateConfig;
//     down?: ButtonStateConfig;
//     disable?: ButtonStateConfig;
// };

// type ButtonStateConfig = {
//     bg?: SpriteConfig | NineSliceConfig;
//     label?: TextConfig;
// };

// type ButtonState = PIXI.Container;

type ButtonStateKey = 'up' | 'down' | 'disable';

// type ButtonStates = {
//     up: ButtonState;
//     down: ButtonState;
//     disable: ButtonState;
// };

type SpriteConfig = {
    texture: string;
    x?: number;
    y?: number;
    tint?: number;
    scale?: Point;
    anchor?: Point;
};

type TextureConfig = string;

// type NineSliceConfig = {
//     texture: string;
//     data: number[];
//     width: number;
//     height: number;
//     x?: number;
//     y?: number;
//     tint?: number;
//     scale?: PIXI.Point;
// };

type TextConfig = {
    x?: number;
    y?: number;
    text: string;
    anchor?: Point;
    style?: Partial<ITextStyle> | TextStyle;
};

// type ParticleConfig = {
//     data: import('@armathai/pixi-particles').ParticleEffectConfig;
//     x?: number;
//     y?: number;
//     scale?: PIXI.Point;
// };

type AnimationConfig = {
    frames: string[];
    speed?: number;
    loop?: boolean;
    x?: number;
    y?: number;
    scale?: Point;
    anchor?: Point;
};

// type SpineConfig = {
//     skeleton: import('pixi-spine').SkeletonData;
//     x?: number;
//     y?: number;
//     scale?: Point;
//     speed?: number;
// };
