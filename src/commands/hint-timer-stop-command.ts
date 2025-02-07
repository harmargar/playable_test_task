import { HintState } from '../constants/states';
import { store } from '../models/store';

export const hintTimerStopCommand = (): void => {
    store.hint.stopTimer();
    store.hint.state = HintState.hide;
};
