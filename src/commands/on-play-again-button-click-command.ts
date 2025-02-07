import { lego } from '@armathai/lego';
import { StorStates } from '../constants/states';
import { store } from '../models/store';
import { updateBalanceCommand } from './update-balance-command';
import { updateGameCommand } from './update-game-command-command';

export const onPlayAgainButtonClickCommand = (): void => {
    lego.command.execute(updateGameCommand);
    lego.command.execute(updateBalanceCommand);

    store.state = StorStates.game;
};
