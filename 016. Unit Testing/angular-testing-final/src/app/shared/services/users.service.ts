import { Injectable, inject } from "@angular/core";
import { UserInterface } from "../types/user.interface";
import { UtilsService } from "./utils.service";

@Injectable()
export class UserService {
    utilsService = inject(UtilsService);
    users: UserInterface[] = [];

    addUser(user: UserInterface): void {
        this.users = [...this.users, user];
    }

    removeUser(userId: string): void {
        const updatedUsers = this.users.filter((user) => userId !== user.id);
        this.users = updatedUsers;
    }

    getUsernames(): string[] {
        return this.utilsService.pluck(this.users, 'name');
    }
}