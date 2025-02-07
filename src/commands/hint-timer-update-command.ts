import { HintState } from '../constants/states';
import { store } from '../models/store';

export const hintTimerUpdateCommand = (): void => {
    store.hint.updateTimer();
    store.hint.state = HintState.hide;
};
