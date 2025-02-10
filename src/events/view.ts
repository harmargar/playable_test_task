export enum MainViewEvent {
    click = 'MainViewClick',
}

export enum CellViewEvent {
    onPointerUp = "CellViewEventOnPointerUp",
    onItemClick = "CellViewEventOnItemClick",
    onMargeEffectComplete = "CellViewEventOnMargeEffectComplete",
    onColectEffectComplete = "CellViewEventOnColectEffectComplete"
}

export enum GameViewEvent {
    mergeCells = "GameViewEventMergeCells"
}

export enum CtaViewEvent {
    playAgainClick = "CtaViewEventPlayAgainClick"
}

export enum SoundViewEvent {
    onClick = "SoundViewEventOnClick"
}
