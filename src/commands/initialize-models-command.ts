import { lego } from '@armathai/lego';
import { initializeBalanceModelCommand } from './initialize-balance-model-command';
import { initializeGameModelCommand } from './initialize-game-model-command';
import { initializeHintModelCommand } from './initialize-hint-model-command';
import { initializeSoundModelCommand } from './initialize-sound-model-command';

export const initializeModelsCommand = (): void => {
    lego.command.execute(initializeGameModelCommand)
        .execute(initializeBalanceModelCommand)
        .execute(initializeSoundModelCommand)
        .execute(initializeHintModelCommand);
};
