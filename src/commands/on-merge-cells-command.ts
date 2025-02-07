import { ITEMS_GRUP } from '../configs/items-config';
import { CellStates } from '../constants/states';
import { store } from '../models/store';
import { CellVIew } from '../views/cell-view';

export const onMergeCellsCommand = (cell1: CellVIew, cell2: CellVIew): void => {
    if (!cell1 || !cell2)
        return
    const cellModel1 = store.game.getCellByColAndRow(cell1.col, cell1.row);
    const cellModel2 = store.game.getCellByColAndRow(cell2.col, cell2.row);

    const cell1Item = cellModel1.itemIndex;
    const cell2Item = cellModel2.itemIndex;

    if (cell1Item == cell2Item) {
        const nextItem = getNextIndex(cell1Item)

        if (nextItem >= 0) {
            cellModel2.itemIndex = nextItem;
            cellModel1.itemIndex = -1;
            store.balance.value += 100;
        }
        else {
            cellModel2.itemIndex = nextItem;
            cellModel1.itemIndex = -1;
        }

        cellModel2.state = CellStates.marge;
        store.game.margeCount += 1;
    } else {
        cellModel1.itemIndex = cell2Item;
        cellModel2.itemIndex = cell1Item;
    }

}

function getNextIndex(currentIndex: number): number {
    for (let i = 0; i < ITEMS_GRUP.length; i++) {
        const group = ITEMS_GRUP[i];
        const pos = group.indexOf(currentIndex);

        if (pos !== -1) {
            if (pos + 1 < group.length) {
                return group[pos + 1];
            } else {
                if (i != ITEMS_GRUP.length - 1)
                    return ITEMS_GRUP[ITEMS_GRUP.length - 1][0];
                return -1;
            }
        }
    }
    return -1;
}
