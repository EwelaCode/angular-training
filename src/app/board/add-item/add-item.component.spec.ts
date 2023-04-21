import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as BoardActions from '../../reducers/board.actions';
import { State } from '../../reducers';
import { BoardColumn } from '../board-items';
import { BoardService } from '../board.service';
import { AddItemComponent } from './add-item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockedItemData = {
  title: 'Test Item',
  description: 'Test description',
  columnId: '123',
};

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;
  let boardService: jasmine.SpyObj<BoardService>;
  let store: jasmine.SpyObj<Store<State>>;

  beforeEach(async () => {
    boardService = jasmine.createSpyObj<BoardService>('BoardService', [
      'addBoardItem',
    ]);
    store = jasmine.createSpyObj<Store<State>>('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      declarations: [AddItemComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: BoardService, useValue: boardService },
        { provide: Store, useValue: store },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add board item and dispatch action', () => {
    const boardItems: BoardColumn[] = [];
    const boardItemsBackend$: Observable<{ boardItems: BoardColumn[] }> = of({
      boardItems,
    });
    component.boardItemsBackend = boardItemsBackend$;
    component.addItemForm.setValue(mockedItemData);
    boardService.addBoardItem.and.returnValue(of({}));
    component.addBoardItem();
    expect(boardService.addBoardItem).toHaveBeenCalledWith(mockedItemData);
    expect(store.dispatch).toHaveBeenCalledWith(
      new BoardActions.AddBoardItem({})
    );
  });

  it('should not add board item if form is invalid', () => {
    const boardItems: BoardColumn[] = [];
    const boardItemsBackend$: Observable<{ boardItems: BoardColumn[] }> = of({
      boardItems,
    });
    component.boardItemsBackend = boardItemsBackend$;
    component.addItemForm.setValue({
      title: '',
      description: '',
      columnId: '',
    });
    boardService.addBoardItem.and.returnValue(of({}));
    component.addBoardItem();
    expect(boardService.addBoardItem).not.toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should not add board item if already loading', () => {
    const boardItems: BoardColumn[] = [];
    const boardItemsBackend$: Observable<{ boardItems: BoardColumn[] }> = of({
      boardItems,
    });
    component.boardItemsBackend = boardItemsBackend$;
    component.addItemForm.setValue(mockedItemData);
    boardService.addBoardItem.and.returnValue(of({}));
    component.loading = true;
    component.addBoardItem();
    expect(boardService.addBoardItem).not.toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
