import { lego } from '@armathai/lego';
import { hintGuard } from '../guards/hint-guard';
import { hintTimerUpdateCommand } from './hint-timer-update-command';

export const onDocumentBodyPointerupCommand = (): void => {
    lego.command.guard(hintGuard).execute(hintTimerUpdateCommand);
}
