export enum ObservableModelEvent {
    uuidUpdate = 'ObservableModelUuidUpdate',
}


export enum StoreEvent {
    uuidUpdate = "StoreUuidUpdate",
    hintUpdate = "StoreHintUpdate",
    gameUpdate = "StoreGameUpdate",
    balanceUpdate = "StoreBalanceUpdate",
    stateUpdate = "StoreStateUpdate",
}

export enum GameModelEvent {
    uuidUpdate = "GameModelUuidUpdate",
    cellsUpdate = "GameModelCellsUpdate",
    margeCountUpdate = "GameModelMargeCountUpdate"
}


export enum BalanceModelEvent {
    valueUpdate = "BalanceModelValueUpdate"
}


export enum CellModelEvent {
    itemIndexUpdate = "CellModelItemIndexUpdate",
    stateUpdate = "CellModelStateUpdate"
}


export enum HintModelEvent {
    stateUpdate = "HintModelStateUpdate"
}


export enum SoundModelEvent {
    stateUpdate = "SoundModelStateUpdate"
}