import { bindable } from 'aurelia-framework';

export class DsoHeader {
    @bindable value: string;

    valueChanged(newValue: string, oldValue: string) {

    }
}

