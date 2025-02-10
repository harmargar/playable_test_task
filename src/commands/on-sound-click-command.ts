import { store } from '../models/store';

export const onSoundClickCommand = (): void => {
    store.sound.updateState();
};

