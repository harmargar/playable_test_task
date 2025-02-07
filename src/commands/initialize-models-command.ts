import { lego } from '@armathai/lego';
import { initializeBalanceModelCommand } from './initialize-balance-model-command';
import { initializeGameModelCommand } from './initialize-game-model-command';
import { initializeHintModelCommand } from './initialize-hint-model-command';

export const initializeModelsCommand = (): void => {
    lego.command.execute(initializeGameModelCommand)
        .execute(initializeBalanceModelCommand)
        .execute(initializeHintModelCommand);
};
