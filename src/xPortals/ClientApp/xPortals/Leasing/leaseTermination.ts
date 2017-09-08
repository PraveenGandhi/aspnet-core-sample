import {
    LeaseTermination as Request, LeaseTerminationResponse as Response,
    LeaseTerminationPost as PostRequest, LeaseTerminationPostResponse as PostResponse
} from "../../xPortalsApi.dtos";
import { autoinject } from 'aurelia-framework';
import { client } from "../shared";
import { DateValueConverter } from "../resources/value-converters/date";

@autoinject
export class LeaseTermination {
    isLoading: boolean = false;

    entity = new Request();
    result: Response;
    postRequest = new PostRequest();
    postResponse: PostResponse;

    constructor(private date: DateValueConverter) { }

    activate(params: any) {
        this.entity.type = this.postRequest.type = params.type;
        this.entity.id = this.postRequest.id = params.id;
        return client.get(this.entity).then(result => {
            this.result = result;
            this.postRequest.terminationDate = this.date.toView(this.result.leaseExpiryDate, 'YYYY-MM-DD');
        }).catch(result => {
            console.error(result);
            this.result = result;
        });
    }

    submit() {
        client.post(this.postRequest).then(result => {
            this.postResponse = result;
        }).catch(result => {
            console.error(result);
            this.postResponse = result;
        });
    }
}