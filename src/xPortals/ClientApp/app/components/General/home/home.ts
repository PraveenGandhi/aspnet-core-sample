import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { RegistrationStep1 } from '../../../../xPortalsApi.dtos';
import { client } from "../../../shared";

@autoinject
export class Registration {
    user: RegistrationStep1 = new RegistrationStep1();

    constructor(private router: Router) { }

    register() {
        client.post(this.user).then(result => {
            this.router.navigate(`mobile-verification/${result.PortalTempUser.Id}/${result.PortalTempUser.PhoneNumber}`);
        });
    }
}

