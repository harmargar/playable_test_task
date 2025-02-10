/* eslint-disable @typescript-eslint/naming-convention */

import { lego } from '@armathai/lego';
import { SoundObservant } from '../observances/sound-observant';

export const createObservancesCommand = async (): Promise<void> => {

    lego.command.execute(() => new SoundObservant());
};
