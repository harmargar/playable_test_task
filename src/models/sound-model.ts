import { SoundState } from '../constants/states';
import { ObservableModel } from './observable-model';

export class SoundModel extends ObservableModel {
    private _state: SoundState;
    private _isOn = false;


    constructor() {
        super("SoundModel");

        this.makeObservable("_state")
    }

    get staet(): SoundState {
        return this._state;
    }

    set state(value: SoundState) {
        this._state = value;
    }

    public updateState(): void {
        if (!this._isOn) {
            this._isOn = true;
            this.state = SoundState.on;
        }
        else {
            this._isOn = false
            this.state = SoundState.off
        }
    }

    public initialize(value: SoundState): void {
        this.state = value;
    }
}