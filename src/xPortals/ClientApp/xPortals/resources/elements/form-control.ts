﻿import { customElement, bindable, containerless } from 'aurelia-framework';

@containerless()
@bindable({
    name: 'value', //name of the property on the class
    attribute: 'value', //name of the attribute in HTML

    defaultBindingMode: 2, //default binding mode used with the .bind command
    defaultValue: undefined //default value of the property, if not bound or set in HTML
})
@bindable({
    name: 'type', //name of the property on the class
    attribute: 'type', //name of the attribute in HTML
    defaultValue: 'text' //default value of the property, if not bound or set in HTML
})
export class FormControlCustomElement {
    @bindable name: string;
    @bindable label: string;
    @bindable required: boolean;
    @bindable example: string;
}
