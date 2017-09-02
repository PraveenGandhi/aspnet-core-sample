import { Router } from 'aurelia-router';
import { autoinject, bindable } from 'aurelia-framework';
import { Registration as Request, RegistrationResponse as Response } from '../../../../xPortalsApi.dtos';
import { client } from "../../../shared";

@autoinject
export class Registration {
    user: Request = new Request();
    result: Response;
    @bindable({ defaultBindingMode: 2 }) isLoading: boolean = false;

    constructor(private router: Router) { }

    register() {
        this.isLoading = true;
        client.post(this.user).then(result => {
            this.isLoading = false;
            this.result = result;
            this.router.navigate(`mobile-verification/${result.portalTempUser.id}/${result.portalTempUser.phoneNumber}`);
        }).catch(result => {
            this.result = result;
            this.isLoading = false;
        });
    }
}

