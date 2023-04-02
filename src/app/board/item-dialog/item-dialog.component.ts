import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardItem } from 'src/app/shared/boardItem.model';
import { DialogContentComponent } from './dialog-content/dialog-content.component';


@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent {

  @Input() item: BoardItem | undefined;
  @Output() itemChange = new EventEmitter<BoardItem>();

  constructor(public dialog: MatDialog) {}

  // openDialog() {
  //   this.dialog.open(DialogContentComponent, {
  //     data: {name: this.item?.name},
  //   });
  //   console.log('open dialog!')
  // }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: {name: this.item?.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.item = result;
    });
  }

  // this should be done when save
  changeItem(): void {
    this.itemChange.emit(this.item);
    console.log('TEST!!!!')
  }
}
