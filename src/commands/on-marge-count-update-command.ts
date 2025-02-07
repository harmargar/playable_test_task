import { lego } from '@armathai/lego';
import { goToCtaGuard } from '../guards/go-to-cta-guard';
import { goToCtaCommand } from './go-to-cta-command';

export const onMargeCountUpdateCommand = (count: number): void => {
    lego.command.payload(count).guard(goToCtaGuard).execute(goToCtaCommand);
};
