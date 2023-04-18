import { Pipe, PipeTransform } from '@angular/core';
import { BoardColumn } from '../board/board-items';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {

  transform(items: BoardColumn[], status: string): any[] {
    if (!items?.length || !status) {
      return items;
    }
    return items.filter(item => item.title === status);
  }

}
