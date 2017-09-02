import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { MobileVerificationRequest as MVRequest, MobileVerificationResponse as MVResponse} from '../../../../xPortalsApi.dtos';
import { client } from "../../../shared";

@autoinject
export class MobileVerification {

    mvRequest: MVRequest = new MVRequest();
    phone: string;
    isLoading: boolean = false;
    result: MVResponse;
    constructor(private router: Router) { }

    activate(params: any) {
        this.mvRequest.Id = params.id;
        this.phone = params.phone;
    }

    completeRegistration() {
        this.isLoading = true;
        client.post(this.mvRequest).then(result => {
            this.isLoading = false;
            if (result.ResponseStatus && result.ResponseStatus.ErrorCode) {
                this.result = result;
            }
            else {
                this.router.navigate(`set-password/${this.mvRequest.Id}/${result.FullName}`);
            }
        }).catch(reason => {
            this.isLoading = false;
            console.log(reason);
        });
    }

    resend() {
        console.log('sent');
    }
}

