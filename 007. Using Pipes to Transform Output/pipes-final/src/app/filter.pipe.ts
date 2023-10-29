import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs-compat/operator/filter';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  
  // Only return servers that match the "filterString"
  transform(value: any, filterString: string): unknown {
    if (!value || !filterString){
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if (item.status == filterString) {
        resultArray.push(item)
      }
    }

    return resultArray;
  }

}
