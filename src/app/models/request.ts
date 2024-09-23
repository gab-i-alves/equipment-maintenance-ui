import { RequestStatus } from "./enums/requestStatus";

export class Request{
    status : RequestStatus

    constructor(status: RequestStatus){
        this.status = status;
    }
}