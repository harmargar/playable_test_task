import { CellAlign, ICellConfig } from '@armathai/pixi-grid';

export const getUIGridLandscapeConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x000000 },
        name: 'ui',
        cells: [
            {
                align: CellAlign.centerTop,
                name: 'logo',
                bounds: { x: 0.85, width: 0.14, y: 0, height: 1 },
                padding: { x: 0.15, width: 0.75, y: 0.05 }
            },
            {
                align: CellAlign.centerTop,
                name: 'balance',
                bounds: { x: 0, width: 0.18, y: 0, height: 1 },
                padding: { x: 0.08, width: 0.92, y: 0.05 }
            },
            {
                name: 'sound',
                bounds: { x: 0.013, width: 0.08, y: 0.8, height: 0.18 },
            }
        ],
    };
};

export const getUIGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x000000 },
        name: 'ui',
        cells: [
            {
                name: 'logo',
                bounds: { x: 0.78, width: 0.18, y: 0.03, height: 0.15 },
            },
            {
                name: 'balance',
                bounds: { x: 0.04, width: 0.3, y: 0.03, height: 0.15 },
            },
            {
                align: CellAlign.leftCenter,
                name: 'sound',
                bounds: { x: 0.04, width: 0.2, y: 0.9, height: 0.08 },
            }
        ],
    };
};
