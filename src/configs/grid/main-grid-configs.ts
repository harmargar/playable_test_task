
import { CellScale, ICellConfig, IRawBounds } from '@armathai/pixi-grid';


function getCanvasBounds(): IRawBounds {
    return { x: 0, y: 0, width: window.game.renderer.width, height: window.game.renderer.height };
}

export const getMainGridLandscapeConfig = (): ICellConfig => {
    return {
        name: 'main',
        // debug: { color: 0xd95027 },
        bounds: getCanvasBounds(),
        cells: [
            {
                name: 'effect',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                // scale: CellScale.fill
            },
            {
                name: 'blocker',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.fill
            },
        ],
    };
};

export const getMainGridPortraitConfig = (): ICellConfig => {
    return {
        name: 'main',
        // debug: { color: 0xd95027 },
        bounds: getCanvasBounds(),
        cells: [
            {
                name: 'effect',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                // scale: CellScale.fill
            },
            {
                name: 'blocker',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.fill
            },
        ],
    };
};
