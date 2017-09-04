import { LeaseTermination as Request, LeaseTerminationResponse } from "../../xPortalsApi.dtos";
import { client } from "../shared";

export class LeaseTermination {
    isLoading: boolean = false;
    Reason: string = 'Company Migration';
    entity: Request = new Request();
    result: LeaseTerminationResponse;

    activate(params: any) {
        this.entity.type = params.type;
        this.entity.id = params.id;
        return client.get(this.entity).then(result => {
            this.result = result;
        }).catch(result => {
            console.error(result);
            this.result = result;
        });
    }
}