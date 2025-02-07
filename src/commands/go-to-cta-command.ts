import { lego } from '@armathai/lego';
import { StorStates } from '../constants/states';
import { store } from '../models/store';
import { destroyHintModelCommand } from './destroy-hint-model-command';

export const goToCtaCommand = (): void => {
    lego.command.execute(destroyHintModelCommand);

    store.state = StorStates.cta
};
