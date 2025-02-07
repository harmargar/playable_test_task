import { CLIME_ITEMS } from '../configs/items-config';
import { CellStates } from '../constants/states';
import { store } from '../models/store';
import { CellVIew } from '../views/cell-view';

export const onItemClickCommand = (cell: CellVIew): void => {

    const cellModel = store.game.getCellByColAndRow(cell.col, cell.row);

    const cellItem = cellModel.itemIndex;

    if (CLIME_ITEMS.find(itemIndex => itemIndex == cellItem)) {
        store.balance.value += 1000;
        cellModel.itemIndex = -1;

        cellModel.state = CellStates.colect;
        store.game.margeCount += 1;
    }
}
