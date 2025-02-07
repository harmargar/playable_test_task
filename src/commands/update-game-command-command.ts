import { store } from '../models/store';

export const updateGameCommand = (): void => {
    store.game.updateCells();
    store.game.margeCount = 0;
};
