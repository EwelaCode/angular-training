import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BoardService } from './board.service';
import { ConfigService } from '../config.service';
import { environment } from 'src/environments/environment';

// describe('BoardService', () => {
//   let service: BoardService;
//   let httpMock: HttpTestingController;
//   let configService: ConfigService;


//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [BoardService, ConfigService],
//     });

//     service = TestBed.inject(BoardService);
//     httpMock = TestBed.inject(HttpTestingController);
//     configService = jasmine.createSpyObj('ConfigService', ['config']);
//     const mockedConfig = {url: 'http://localhost:3000/dev'};
//     configService.config.and.returnValue(mockedConfig);

//   });

//   afterEach(() => {
//     httpMock.verify();
//     configService.config.calls.reset();

//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

  // describe('getBoardItems', () => {
  //   it('should return an Observable<BoardColumn[]>', () => {
  //     const mockBoardItems = {
  //       columns: [
  //         { title: 'Column 1', tasks: [], id: '123', createdAt: '2022-02-01' },
  //         { title: 'Column 2', tasks: [], id: '321', createdAt: '2022-02-01' },
  //       ],
  //     };

  //     service.getBoardItems().subscribe((boardItems) => {
  //       expect(boardItems).toEqual(mockBoardItems.columns);
  //     });
  //     console.log(configService.config, 'configService.config!!!!!')
  //     const apiUrl = `${configService.config.url}/board`;
  //     const req = httpMock.expectOne(apiUrl);
  //     expect(req.request.method).toBe('GET');
  //     req.flush(mockBoardItems);
  //   });
  // });

//   describe('addBoardItem', () => {
//     it('should make a POST request to the API and emit a dataChanged$ event', () => {
//       const mockBoardItem = { id: '123', title: 'Task 1', columnId: '321', description: 'Test description' };
//       const spy = spyOn(service.dataChanged$, 'next');

//       service.addBoardItem(mockBoardItem).subscribe(() => {
//         expect(spy).toHaveBeenCalled();
//       });

//       const apiUrl = `${environment.url}/tasks`;
//       const req = httpMock.expectOne(apiUrl);
//       expect(req.request.method).toBe('POST');
//       req.flush({});
//     });
//   });
// });
