import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

import { SearchService } from './search.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchField = new FormControl('');
  results$: Observable<string[]>;

  constructor(private searchService: SearchService) {
    this.results$ = this.searchField.valueChanges.pipe(
      filter(value => typeof value === 'string'),
      debounceTime(200),
      distinctUntilChanged<any>(),
      switchMap((term: string) => this.searchService.search(term)),
    )
  }
}
