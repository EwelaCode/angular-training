import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from '../board.service';
import { BoardColumn } from '../board-items';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as BoardActions from "../../reducers/board.actions";


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddItemComponent implements OnInit {
  @Input() boardItemsBackend:  Observable<{boardItems: BoardColumn[]}>;
  // @Input() boardItemsBackend: BoardColumn[] = [];
  addItemForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder,
    private boardItemsService: BoardService,
    private store: Store<State>
    ) {}

  ngOnInit() {
    this.addItemForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4000),
      ]],
      columnId: ['', [
        Validators.required,
        // @TODO: we could create own validator to check if it's valid status value
      ]],
    })

    // this.addItemForm.valueChanges.subscribe(console.log)
  }

  // we need it to display error messages
  get title() {
    return this.addItemForm.get('title')
  }

  get description() {
    return this.addItemForm.get('description')
  }

  get columnId() {
    return this.addItemForm.get('columnId')
  }


  addBoardItem() {
    if (this.loading || this.addItemForm.invalid) return;

    this.loading = true;

    const formValues = this.addItemForm.value;

    this.boardItemsService.addBoardItem(formValues).subscribe({
      next: (data) => {this.store.dispatch(new BoardActions.AddBoardItem(data))},
      error: (error) => {
        this.errorMessage = `Add Item - Error ocurred - ${error.statusText}`
      },
    });

    this.addItemForm.reset({status: 'To Do'});
    this.loading = false;
  }
}
