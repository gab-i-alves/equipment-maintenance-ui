import { RequestStatus } from "./enums/requestStatus";

export interface MaintenceRequest{

    status: RequestStatus,
    date: String,
    id: number,
    userName: string,
    description: string,
    finalizationDate?: string;
    finalizedBy?: string;

}
