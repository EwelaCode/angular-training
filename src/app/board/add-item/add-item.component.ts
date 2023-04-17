import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from '../board.service';
import { BoardColumn } from '../board-items';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  @Input() boardItemsBackend: BoardColumn[] = [];
  addItemForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder,
    private boardItemsService: BoardService
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
      next: () => {},
      error: (error) => {
        this.errorMessage = `Add Item - Error ocurred - ${error.statusText}`
      },
    });

    this.addItemForm.reset({status: 'To Do'});
    this.loading = false;
  }
}
