import { gameConfig } from '../configs/game-config';
import { store } from '../models/store';

export const updateBalanceCommand = (): void => {
    store.balance.value = gameConfig.startingBalance;
};
