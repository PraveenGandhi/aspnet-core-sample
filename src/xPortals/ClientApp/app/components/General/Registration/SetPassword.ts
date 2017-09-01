import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { SetPasswordRequest as SPRequest } from '../../../../xPortalsApi.dtos';
import { client } from "../../../shared";

@autoinject
export class SetPassword {
    user: SPRequest = new SPRequest();
    fullName: string;

    constructor(private router: Router) { }

    activate(params: any) {
        this.user.Id = params.id;
    }

    completeRegistration() {
        client.post(this.user).then(result => {
            console.log(result);
            this.router.navigate('/');
        });
    }
}

