import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { BoardItem } from '../shared/boardItem.model';

@Directive({
  selector: '[appUnless]'
})
export class ItemDirectiveDirective {
  private hasView = false;

  @Input() set completedItems(boardItem: BoardItem) {
    console.log(boardItem.status)
    if (boardItem.status === 'Completed' && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (boardItem.status !==  'Completed' && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

}
