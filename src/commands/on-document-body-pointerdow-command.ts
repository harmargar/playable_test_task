import { lego } from '@armathai/lego';
import { hintGuard } from '../guards/hint-guard';
import { hintTimerStopCommand } from './hint-timer-stop-command';

export const onDocumentBodyPointerdownCommand = (uuId: string): void => {
    lego.command.guard(hintGuard).execute(hintTimerStopCommand);
}
