import { lego } from '@armathai/lego';
import { CellViewEvent, GameViewEvent } from '../events/view';
import { onColectEffectCompleteCommand } from './on-colect-effect-complete-command';
import { onItemClickCommand } from './on-item-click-command';
import { onMergeCellsCommand } from './on-merge-cells-command';
import { onMargeEffectCompleteCommand } from './on-merge-effect-complete-command';

export const mapGameCommandsCommand = (): void => {
    lego.command
        .on(GameViewEvent.mergeCells, onMergeCellsCommand)
        .on(CellViewEvent.onItemClick, onItemClickCommand)
        .on(CellViewEvent.onMargeEffectComplete, onMargeEffectCompleteCommand)
        .on(CellViewEvent.onColectEffectComplete, onColectEffectCompleteCommand)
    //     .on(MenuItemViewEvent.activeButtonClick, onMenuItemActiveButtonClickCommand)
    //     .on(MenuItemViewEvent.upgradeButtonClick, onMenuItemUpgradeButtonClickCommand)
    //     .on(BotViewEvent.click, onBotClickCommand)
    //     .on(BossViewEvent.click, onBossClickCommand)
    //     .on(BotModelEvent.defeatUpdate, onBotDefeatUpdateCommand)
    //     .on(BossModelEvent.reviveTimerCompleteUpdate, onBossReviveTimerCompleteUpdateCommand)
    //     .on(BossModelEvent.defeatUpdate, onBossDefeatUpdateCommand)
    //     .on(FriendModelEvent.stateUpdate, onFriendStateUpdateCommand);
};
