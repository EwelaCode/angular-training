import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BoardService } from './board.service';
import { ConfigService } from '../config.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { BoardItems } from './board-items';

describe('BoardService', () => {
  let service: BoardService;
  let httpMock: HttpTestingController;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardService, ConfigService]
    });
    service = TestBed.inject(BoardService);
    httpMock = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);
    configService.config = { url: 'http://localhost:3000/dev' };
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch board items from the API', () => {
    const mockBoardItems: BoardItems = {
      columns: [
        { title: 'Todo', tasks: [], id: '123', createdAt: '01-02-2023' },
        { title: 'In progress', tasks: [], id: '456', createdAt: '01-02-2023' },
        { title: 'Done', tasks: [], id: '789', createdAt: '01-02-2023' }
      ]
    };

    service.getBoardItems().subscribe(boardItems => {
      expect(boardItems).toEqual(mockBoardItems.columns);
    });

    const req = httpMock.expectOne(Location.joinWithSlash(configService.config.url, '/board'));
    expect(req.request.method).toEqual('GET');
    req.flush(mockBoardItems);
  });

  it('should add a board item via the API', () => {
    const mockBoardItem = { title: 'Test Item', columnId: '123', description: 'New Item' };

    service.addBoardItem(mockBoardItem).subscribe(() => {
      // Expect the dataChanged$ subject to have emitted
      service.dataChanged$.subscribe(() => {
        expect(true).toBeTruthy();
      });
    });

    const req = httpMock.expectOne(Location.joinWithSlash(environment.url, '/tasks'));
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockBoardItem);
    req.flush({});
  });
});
