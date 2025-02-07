import { store } from '../models/store';

export const destroyBalanceModelCommand = (): void => {
    store.destroyBalanceModel();
};
