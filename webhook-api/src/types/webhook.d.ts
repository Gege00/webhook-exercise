
export class Webhook {
    url:string;
    token: string;
    
    constructor(url:string, token:string){
        this.url= url;
        this.token = token;

    }
}

export interface CreateWebhook{
    url:string;
    token: string;
}

export interface CreatePayload{
    payload: Array<unknown>;
}

