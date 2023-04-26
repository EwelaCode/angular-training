import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestScheduler } from 'rxjs/testing';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { hot, cold } from 'jasmine-marbles';

import { SearchService } from './search.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const searchMocks = {
  columns: [
    { title: 'TO DO' },
    { title: 'In Progress' },
    { title: 'Completed' }
  ]
}

describe('SearchService', () => {
  let service: SearchService;
  let httpController: HttpTestingController;
  let url = environment.url;
  let http: HttpClient;

  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SearchService);
    httpController = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);

    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call search and return searched items', (done: DoneFn) => {
    service.search('test').subscribe((res) => {
      expect(res).toEqual(searchMocks.columns.map(column => column.title));
      done()
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/board?search=test`,
    });

    req.flush(searchMocks);
    httpController.verify()
  });

// ****************************************
// Testing RxJS Code with Marble Diagrams
// ****************************************
    it('should return the correct search result', () => {
    scheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const searchTerm = 'Completed';
      const expectedResponse = cold('--a|', { a: searchMocks });
      spyOn(http, 'get').and.returnValue(expectedResponse);
      const result$ = service.search(searchTerm);
      const expectedValues = [ 'TO DO', 'In Progress', 'Completed' ];

      expectObservable(result$).toBe('--a|', {a: expectedValues});
    });

  })

});
