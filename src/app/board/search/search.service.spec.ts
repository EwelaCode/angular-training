import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SearchService } from './search.service';
import { environment } from 'src/environments/environment';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(SearchService);
    httpController = TestBed.inject(HttpTestingController);
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




});
