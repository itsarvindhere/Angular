import { Injectable } from "@angular/core";

@Injectable()
export class UtilsService {
    range = (start: number, end: number): number[] => {
        return [...Array(end - start).keys()].map((el) => el + start);
    }

    pluck = (elements: any[], field: string) => {
        return elements.map((el) => el[field]);
    }
}