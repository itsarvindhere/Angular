import { Observable } from "rxjs";
export interface CanDeactivateComponent {
    onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}