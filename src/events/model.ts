export enum ObservableModelEvent {
    uuidUpdate = 'ObservableModelUuidUpdate',
}

export enum GameModelEvent {
    uuidUpdate = "GameModelUuidUpdate",
    cellsUpdate = "GameModelCellsUpdate"
}


export enum BalanceModelEvent {
    valueUpdate = "BalanceModelValueUpdate"
}


export enum CellModelEvent {
    itemIndexUpdate = "CellModelItemIndexUpdate",
    stateUpdate = "CellModelStateUpdate"
}