import { lego } from '@armathai/lego';
import { createObservancesCommand } from './create-observances-command';
import { initializeModelsCommand } from './initialize-models-command';
import { mapGameCommandsCommand } from './map-game-commands-command';

export const onGameStartCommand = (): void => {
    lego.command
        .execute(createObservancesCommand)
        .execute(mapGameCommandsCommand)
        .execute(initializeModelsCommand);
};
