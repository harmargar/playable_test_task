import { store } from '../models/store';

export const destroyHintModelCommand = (): void => {
    store.destroyHintModel();
};
