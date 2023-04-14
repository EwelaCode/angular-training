import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { ItemComponent } from './item/item.component';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { DialogContentComponent } from './item-dialog/dialog-content/dialog-content.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from './highlight.directive';
import { ContentProjectionComponent } from './content-projection/content-projection.component';
import { ItemDirectiveDirective } from './item-directive.directive';
import { AddItemComponent } from './add-item/add-item.component';

@NgModule({
  declarations: [
    BoardComponent,
    ItemComponent,
    ItemDialogComponent,
    DialogContentComponent,
    ContentProjectionComponent,
    ItemDirectiveDirective,
    AddItemComponent,
  ],
  imports: [
    ReactiveFormsModule,
    // do I have to import it in every module?
    FormsModule,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    HighlightDirective,
    MatRadioModule,
  ],
  exports: [
    CommonModule,
    BoardComponent,
    ItemComponent,
    ItemDialogComponent,
    DialogContentComponent,
    ContentProjectionComponent,
    ItemDirectiveDirective
  ],
})
export class BoardModule { }
