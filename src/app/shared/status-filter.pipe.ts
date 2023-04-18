import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {

  transform(items: any[], status: string): any[] {
    if (!items?.length || !status) {
      return items;
    }
    return items.filter(item => item.title === status);
  }

}
