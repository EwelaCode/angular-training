import { Observable, Subject, Subscription, startWith, switchMap, takeUntil } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardItem } from '../shared/boardItem.model';
import { BoardService } from './board.service';
import { BoardColumn, BoardItems } from './board-items';
import { initialBoardItems } from '../shared/mocks';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { SetBoardItems } from '../reducers/board.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BoardService],
  animations: [
    trigger('openClose', [
      state('selected', style({
        opacity: 1,
        backgroundColor: 'white',
        margin: '50px',
      })),
      state('unSelected', style({
        opacity: 0.7,
        backgroundColor: '#03fccf',
      })),
      transition('selected => unSelected', [
        animate(400)
      ]),
      transition('unSelected => selected', [
        animate('1s')
      ]),
    ]),
  ],
})
export class BoardComponent implements OnInit, OnDestroy {
  boardItems: BoardItem[] = [];
  selectedItem: BoardItem = { name: '', description: '', status: '' };
  isItemEdited = false;
  itemsDisplay: string = 'ALL';

  nameOnParent: string = 'My test name';
  userName = 'My user test name for 2 way Data-Binding';

  errorMessage: string | null = null;
  isSelected = true;

  boardItemsBackend: BoardColumn[] = [];
  // private subscription: Subscription;
  destroy$ = new Subject<void>();


  boardItemsBackend$ = this.store.select('boardItems');

  constructor(private boardItemsService: BoardService,
    private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new SetBoardItems());

    // this.boardItemsService.dataChanged$.pipe(
    //   // startWith to trigger the switchMap; without that we have no value
    //   startWith(null),
    //   switchMap(() => this.boardItemsService.getBoardItems()),
    //   takeUntil(this.destroy$)
    // ).subscribe({
    //   next: (data: BoardColumn[]) => {
    //     this.errorMessage = null;
    //     this.boardItemsBackend = data
    //   },
    //   error: (error) => {
    //     this.errorMessage = `Board items data it's not available - ${error.statusText}`
    //   },
    // })

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

  resizeCard() {
    this.isSelected = !this.isSelected;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
