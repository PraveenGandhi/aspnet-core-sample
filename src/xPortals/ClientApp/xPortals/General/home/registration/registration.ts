import { Router } from 'aurelia-router';
import { autoinject, bindable } from 'aurelia-framework';
import { RegistrationStep1 as RegistrationRequest } from '../../../../xPortalsApi.dtos';
import { client } from "../../../shared";

@autoinject
export class Registration {
    user: RegistrationRequest = new RegistrationRequest();
    @bindable({ defaultBindingMode: 2 }) isLoading: boolean = false;

    constructor(private router: Router) { }

    register() {
        this.isLoading = true;
        client.post(this.user).then(result => {
            this.isLoading = false;
            this.router.navigate(`mobile-verification/${result.PortalTempUser.Id}/${result.PortalTempUser.PhoneNumber}`);
        });
    }
}

