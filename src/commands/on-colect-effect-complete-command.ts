import { CellStates } from '../constants/states';
import { store } from '../models/store';

export const onColectEffectCompleteCommand = (uuId: string): void => {
    store.game.getCellByUuId(uuId).state = CellStates.idel;
}
