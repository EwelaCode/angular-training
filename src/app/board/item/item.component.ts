import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardItem } from 'src/app/shared/boardItem.model';
import { ItemService } from './item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ItemService]
})
export class ItemComponent {

  //Input() decorator means that
  //we can pass parameters to this component
  @Input() isEdited!: boolean;
  @Output() isEditedChange = new EventEmitter<boolean>();

  @Input() name!: string;
  @Output() nameChange = new EventEmitter<string>();

  // ! - it tells TS that this value won't be undefined;
  @Input() item!: BoardItem;
  @Output() itemChange = new EventEmitter<BoardItem>();

  constructor( private itemService: ItemService) {}

  closeEdition() {
    this.isEditedChange.emit(false)
  }

  changeName(): void {
    this.nameChange.emit(this.name);
    this.isEditedChange.emit(false)
    console.log('emited changeName', this.item)
  }

  changeItem(): void {
    this.itemChange.emit(this.item);
    console.log('emited', this.item)
  }
}
