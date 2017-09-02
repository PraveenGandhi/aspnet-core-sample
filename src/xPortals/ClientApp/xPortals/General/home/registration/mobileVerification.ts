import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { MobileVerification as Request, MobileVerificationResponse as Response } from '../../../../xPortalsApi.dtos';
import { client } from "../../../shared";

@autoinject
export class MobileVerification {

    user: Request = new Request();
    phone: string;
    isLoading: boolean = false;
    result: Response;

    constructor(private router: Router) { }

    activate(params: any) {
        this.user.Id = params.id;
        this.phone = params.phone;
    }

    verifyCode() {
        this.isLoading = true;
        client.post(this.user).then(result => {
            this.isLoading = false;
            this.result = result;
            if (result.ResponseStatus && result.ResponseStatus.ErrorCode) {
                return;
            }
            this.router.navigate(`set-password/${this.user.Id}/${result.FullName}`);
        }).catch(reason => {
            this.isLoading = false;
            console.log(reason);
        });
    }

    resend() {
        console.log('sent');
    }
}

