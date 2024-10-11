import { RequestStatus } from "./enums/requestStatus";

export class Request{
    status : RequestStatus

    constructor(status: RequestStatus){
        this.status = status;
    }

    redirect(target: any){ // target: Employee
        //new RequestChangeLog(this.request, requestChange.redirect, target);
        //this.employee = target;
        this.status = RequestStatus.Redirected;
    }

    doMaintence(){
        //new RequestChangeLog(this.request, requestChange.maintence);
        this.status = RequestStatus.WaitingPayment;
    }

    finishRequest(){
        //new RequestChangeLog(this.request, requestChange.finish);
        this.status = RequestStatus.Finished;
    }
}