import { ICellConfig } from '@armathai/pixi-grid';

export const getGameGridLandscapeConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x2fc900 },
        name: 'game',
        cells: [
            {
                name: 'board',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                padding: {
                    y: 0.08,
                    height: 0.9,
                    x: 0.1,
                    width: 0.8
                },
            },
        ],
    };
};

export const getGameGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x2fc900 },
        name: 'game',
        cells: [
            {
                name: 'board',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                padding: {
                    y: 0.15,
                    height: 0.8,
                    x: 0.05,
                    width: 0.9
                },
            },
        ],
    };
};
