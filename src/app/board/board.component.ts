import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { BoardItem } from '../shared/boardItem.model';

const initialBoardItems = [
  {
    name: 'Create Header',
    description: 'Create header on the top of the page',
    status: 'Completed',
  },
  {
    name: 'Create Scrum Board Component',
    description: 'Create a component for displaying the Scrum board items',
    status: 'In Progress',
  },
  {
    name: 'Display tasks parameters on Scrum Board',
    description: 'Use data binding to display the item name, description, and status.',
    status: 'To Do',
  },
]

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boardItems: BoardItem[] = initialBoardItems;
  selectedItem: BoardItem = {name: '', description: '', status: ''};
  isItemEdited: Boolean = false;
  itemsDisplay: string = 'ALL';

  nameOnParent: string = 'My test name';
  userName = "My user test name for 2 way Data-Binding"
  // constructor(private service: BoardItemService) { }

  ngOnInit() {
    // this.boardItems = this.service.getItems();
  //  this.boardItems = initialBoardItems;
  }

  statusColor() {
return 'red';
  }

  selectItem(boardItem: BoardItem) {
    this.selectedItem = boardItem;
    this.isItemEdited = !this.isItemEdited;
    console.log("I selected item --- ", boardItem)
  }

  changeItemsDisplay(rule: string) {
    this.itemsDisplay = rule;
  }

}
