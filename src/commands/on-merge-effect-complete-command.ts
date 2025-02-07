import { CellStates } from '../constants/states';
import { store } from '../models/store';

export const onMargeEffectCompleteCommand = (uuId: string): void => {
    store.game.getCellByUuId(uuId).state = CellStates.idel;
}
