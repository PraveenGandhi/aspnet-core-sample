import { bindable, containerless } from 'aurelia-framework';
import { ResponseError } from "../../../xPortalsApi.dtos";

@containerless()
export class DisplayErrors {
    @bindable({
        attribute: 'result', //name of the attribute in HTML
        defaultValue: {} //default value of the property, if not bound or set in HTML
    }) result: any = {};

    resultChanged(value: any) {
        this.result = value;
        if (this.result && this.result.responseStatus
            && this.result.responseStatus.errors
            && this.result.responseStatus.errors.length == 0) {
            var error = new ResponseError();
            error.message = this.result.responseStatus.message
            var errors: ResponseError[] = new Array();
            errors = [error];
            this.result.responseStatus.errors = errors;
        }
    }
}