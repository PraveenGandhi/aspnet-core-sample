import { Router } from 'aurelia-router';
import { autoinject, bindable } from 'aurelia-framework';
import { Authenticate } from '../../../../xPortalsApi.dtos';
import { client } from "../../../shared";

@autoinject
export class Login {
    user: Authenticate = new Authenticate();
    @bindable({ defaultBindingMode: 2 }) isLoading: boolean = false;

    constructor(private router: Router) { }

    login() {
        this.isLoading = true;
        this.user.provider = 'credentials';
        this.user.useTokenCookie = true;
        client.send('post', this.user).then(result => {
            console.log(result);
            this.isLoading = false;
            //this.router.navigate(`mobile-verification/${result.PortalTempUser.Id}/${result.PortalTempUser.PhoneNumber}`);
        });
    }
}