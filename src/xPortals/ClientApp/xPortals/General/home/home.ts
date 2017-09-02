export class Home {
    isLoading: boolean = false;
    message: string;
    activate(params: any) {
        this.message = params.message;
    }
}

