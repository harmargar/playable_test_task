
import { ICellConfig, IRawBounds } from '@armathai/pixi-grid';


function getCanvasBounds(): IRawBounds {
    return { x: 0, y: 0, width: window.game.renderer.width, height: window.game.renderer.height };
}

export const getMainGridLandscapeConfig = (): ICellConfig => {
    return {
        name: 'main',
        // debug: { color: 0xd95027 },
        bounds: getCanvasBounds(),
        // padding: { y: 0.05 },
    };
};

export const getMainGridPortraitConfig = (): ICellConfig => {
    return {
        name: 'main',
        // debug: { color: 0xd95027 },
        bounds: getCanvasBounds(),
        // padding: { y: 0.05 },
    };
};
