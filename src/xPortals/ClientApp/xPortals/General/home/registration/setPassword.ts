import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { SetPassword as Request, SetPasswordResponse as Response } from '../../../../xPortalsApi.dtos';
import { client } from "../../../shared";

@autoinject
export class SetPassword {
    user: Request = new Request();
    result: Response;
    fullName: string;
    isLoading: boolean = false;

    constructor(private router: Router) { }

    activate(params: any) {
        this.user.id = params.id;
        this.fullName = params.fullName;
    }

    completeRegistration() {
        this.isLoading = true;
        client.post(this.user).then(result => {
            this.isLoading = false;
            this.router.navigate('/?message=Registration successful..!');
        }).catch(result => {
            this.result = result;
            this.isLoading = false;
        });
    }
}

