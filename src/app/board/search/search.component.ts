import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { SearchService } from './search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  private searchTerms = new Subject<string>();
  results$: Observable<string[]>;

  constructor(private searchService: SearchService) {
    this.results$ = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchService.search(term)),
    )
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
