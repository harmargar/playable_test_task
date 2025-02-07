import { CellScale, ICellConfig } from '@armathai/pixi-grid';

export const getCTAGridLandscapeConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x000000 },
        name: 'ui',
        cells: [
            {
                scale: CellScale.fill,
                name: 'bg',
                bounds: { x: 0, width: 1, y: 0, height: 1 },
            },
            {
                name: 'logo',
                bounds: { x: 0.25, width: 0.5, y: 0.1, height: 0.3 },
            },
            {
                name: 'text',
                bounds: { x: 0.1, width: 0.8, y: 0.43, height: 0.23 },
            },
            {
                name: 'button',
                bounds: { x: 0.1, width: 0.8, y: 0.72, height: 0.16 },
            }
        ],
    };
};

export const getCTAGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x000000 },
        name: 'ui',
        cells: [
            {
                scale: CellScale.fill,
                name: 'bg',
                bounds: { x: 0, width: 1, y: 0, height: 1 },
            },
            {
                name: 'logo',
                bounds: { x: 0.25, width: 0.5, y: 0.1, height: 0.3 },
            },
            {
                name: 'text',
                bounds: { x: 0.1, width: 0.8, y: 0.43, height: 0.2 },
            },
            {
                name: 'button',
                bounds: { x: 0.2, width: 0.6, y: 0.7, height: 0.2 },
            }
        ],
    };
};
