import { JsonServiceClient } from 'servicestack-client';
import { RegistrationStep1 } from '../../../../xPortalsApi.dtos';

export class Registration {
    user: RegistrationStep1 = new RegistrationStep1();
    client: JsonServiceClient = new JsonServiceClient('/');

    register() {
        this.client.post(this.user).then(console.log);
    }
}

