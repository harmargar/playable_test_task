import { ObservableModel } from './observable-model';

export class BalanceModel extends ObservableModel {
    private _value: number = 0;

    constructor() {
        super("BalanceModel");

        this.makeObservable("_value")
    }

    get value(): number {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    public initialize(value: number = 0): void {
        this.value = value
    }
}