import { lego } from '@armathai/lego';
import { StorStates } from '../constants/states';
import { hintGuard } from '../guards/hint-guard';
import { store } from '../models/store';
import { initializeHintModelCommand } from './initialize-hint-model-command';
import { updateBalanceCommand } from './update-balance-command';
import { updateGameCommand } from './update-game-command-command';

export const onPlayAgainButtonClickCommand = (): void => {
    lego.command.execute(updateGameCommand);
    lego.command.execute(updateBalanceCommand);
    lego.command.guard(() => !hintGuard()).execute(initializeHintModelCommand);

    store.state = StorStates.game;
};
