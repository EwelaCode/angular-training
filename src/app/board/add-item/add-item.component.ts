import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  addItemForm!: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private boardItemsService: BoardService
    ) {}

  ngOnInit() {
    this.addItemForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4000),
      ]],
      status: ['To Do', [
        Validators.required,
        // @TODO: we could create own validator to check if it's valid status value
      ]],
    })

    this.addItemForm.valueChanges.subscribe(console.log)
  }

  // we need it to display error messages
  get name() {
    return this.addItemForm.get('name')
  }

  get description() {
    return this.addItemForm.get('description')
  }

  get status() {
    return this.addItemForm.get('status')
  }


  addBoardItem() {
    if (this.loading || this.addItemForm.invalid) return;

    this.loading = true;

    const formValues = this.addItemForm.value;

    this.boardItemsService.addBoardItem(formValues).subscribe(data => console.log(data))

    this.addItemForm.reset({status: 'To Do'});
    this.loading = false;
  }
}
