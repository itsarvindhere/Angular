import { Injectable } from "@angular/core";
import { UserInterface } from "../types/user.interface";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UserService {
    // users: UserInterface[] = [];
    users$ = new BehaviorSubject<UserInterface[]>([]);

    addUser(user: UserInterface): void {
        this.users$.next([...this.users$.getValue(), user]);
    }

    removeUser(userId: string): void {
        const updatedUsers = this.users$.getValue().filter((user) => userId !== user.id);
        this.users$.next(updatedUsers);
    }
}