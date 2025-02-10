import { lego } from '@armathai/lego';
import { GameEvent } from '../events/game';
import { GameModelEvent } from '../events/model';
import { CellViewEvent, CtaViewEvent, GameViewEvent, SoundViewEvent } from '../events/view';
import { onColectEffectCompleteCommand } from './on-colect-effect-complete-command';
import { onDocumentBodyPointerdownCommand } from './on-document-body-pointerdow-command';
import { onDocumentBodyPointerupCommand } from './on-document-body-pointerup-command';
import { onGameResizeCommand } from './on-game-resize-command';
import { onItemClickCommand } from './on-item-click-command';
import { onMargeCountUpdateCommand } from './on-marge-count-update-command';
import { onMergeCellsCommand } from './on-merge-cells-command';
import { onMargeEffectCompleteCommand } from './on-merge-effect-complete-command';
import { onPlayAgainButtonClickCommand } from './on-play-again-button-click-command';
import { onSoundClickCommand } from './on-sound-click-command';

export const mapGameCommandsCommand = (): void => {
    lego.command
        .on(GameViewEvent.mergeCells, onMergeCellsCommand)
        .on(CellViewEvent.onItemClick, onItemClickCommand)
        .on(CellViewEvent.onMargeEffectComplete, onMargeEffectCompleteCommand)
        .on(CellViewEvent.onColectEffectComplete, onColectEffectCompleteCommand)
        .on(GameEvent.documentBodyPointerDown, onDocumentBodyPointerdownCommand)
        .on(GameEvent.documentBodyPointerUp, onDocumentBodyPointerupCommand)
        .on(GameEvent.resize, onGameResizeCommand)
        .on(GameModelEvent.margeCountUpdate, onMargeCountUpdateCommand)
        .on(CtaViewEvent.playAgainClick, onPlayAgainButtonClickCommand)
        .on(SoundViewEvent.onClick, onSoundClickCommand);
};
