import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getUIGridConfig } from '../configs/grid-configs';
import { BalanceView } from './balance-view';
import { LogoView } from './logo-view';
import { SoundView } from './sound-view';

export class UIView extends PixiGrid {
    public constructor() {
        super();
        this.name = 'UIView';
        this._init();
    }

    public getGridConfig(): ICellConfig {
        return getUIGridConfig();
    }

    private _init(): void {
        const logo = new LogoView();
        const balance = new BalanceView();
        const sound = new SoundView();

        this.setChild("logo", logo);
        this.setChild("balance", balance);
        this.setChild('sound', sound);
    }
}
