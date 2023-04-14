import { Component, OnInit } from '@angular/core';
import { BoardItem } from '../shared/boardItem.model';
import { BoardService } from './board.service';
import { BoardItems } from './board-items';
import { initialBoardItems } from '../shared/mocks';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BoardService]
})
export class BoardComponent implements OnInit {
  boardItems: BoardItem[] = [];
  selectedItem: BoardItem = { name: '', description: '', status: '' };
  isItemEdited = false;
  itemsDisplay: string = 'ALL';

  nameOnParent: string = 'My test name';
  userName = 'My user test name for 2 way Data-Binding';

  condition = false;

  boardItemsBackend: BoardItems[] = []

  constructor(private boardItemsService: BoardService) {}

  ngOnInit() {
    this.boardItemsService.getBoardItems().subscribe((data: BoardItems[]) => this.boardItemsBackend = data);


    this.boardItems = initialBoardItems;
  }

  getStatusColor(status: string) {
    if (status === 'Completed') {
      return 'teal';
    } else if (status === 'In Progress') {
      return 'lime';
    }
    return '#26c6da';
  }

  selectItem(boardItem: BoardItem) {
    this.selectedItem = boardItem;
    this.isItemEdited = !this.isItemEdited;
  }

  changeItemsDisplay(rule: string) {
    this.itemsDisplay = rule;
    // if (rule === 'Completed') {
    //   this.condition = true;
    // } else {
    //   this.condition = false;
    // }
  }

  changeCondition() {
    this.condition = !this.condition;
  }

  addColumns() {
    this.boardItemsService.addBoardColumns().subscribe(resData => {
      console.log(resData);
    });
  }
}
