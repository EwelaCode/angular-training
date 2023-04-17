import { Observable, Subject, Subscription, startWith, switchMap, takeUntil } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardItem } from '../shared/boardItem.model';
import { BoardService } from './board.service';
import { BoardColumn, BoardItems } from './board-items';
import { initialBoardItems } from '../shared/mocks';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BoardService]
})
export class BoardComponent implements OnInit, OnDestroy {
  boardItems: BoardItem[] = [];
  selectedItem: BoardItem = { name: '', description: '', status: '' };
  isItemEdited = false;
  itemsDisplay: string = 'ALL';

  nameOnParent: string = 'My test name';
  userName = 'My user test name for 2 way Data-Binding';

  errorMessage: string | null = null;

  boardItemsBackend: BoardColumn[] = [];
  // private subscription: Subscription;
  destroy$ = new Subject<void>();

  constructor(private boardItemsService: BoardService) {}

  ngOnInit() {

    this.boardItemsService.dataChanged$.pipe(
      // startWith to trigger the switchMap; without that we have no value
      startWith(null),
      switchMap(() => this.boardItemsService.getBoardItems()),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: BoardColumn[]) => {
        this.errorMessage = null;
        this.boardItemsBackend = data
      },
      error: (error) => {
        this.errorMessage = `Board items data it's not available - ${error.statusText}`
      },
    })
//https://rxjs.dev/deprecations/subscribe-arguments


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
  }


  addColumns() {
    this.boardItemsService.addBoardColumns().subscribe(resData => {
      console.log(resData);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
