import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, fields: string[]): any[] {
    if (!items) return [];
    if (!searchText) return items;
    
    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return fields.some(field => 
        item[field] && item[field].toString().toLowerCase().includes(searchText)
      );
    });
  }
}