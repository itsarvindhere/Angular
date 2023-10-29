import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], order): unknown {
    value.sort((a,b) => {
      if (!order || order == "ASC") {
        return a.name.localeCompare(b.name)
      } else{
        return b.name.localeCompare(a.name)
      }
      
    });
    return value;
  }

}
