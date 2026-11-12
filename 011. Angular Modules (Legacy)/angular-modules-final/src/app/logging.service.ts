import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    lastLog !: string;

    printLog(message: string){
        console.log("New Log is -> ", message);
        console.log("Last Log was -> ", this.lastLog);
        this.lastLog = message;
    }
}