import { store } from '../models/store';

export const hintGuard = (): boolean => {
    return !!store.hint;
};
