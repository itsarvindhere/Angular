import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: false
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, limit: number, anotherArgument: any): unknown {
    console.log("Another arugument is ", anotherArgument);
    if (value.length > limit) {
      return value.substring(0,limit) + "...";
    }
    return value
  }
}
