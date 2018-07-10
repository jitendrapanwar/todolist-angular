import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { API_URL } from '../app.endpoints';
import { BaseService, Comment } from './base.service';

describe('BaseService', () => {
  let injector: TestBed;
  let service: BaseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseService]
    });

    injector = getTestBed();
    service = injector.get(BaseService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([BaseService], (bs: BaseService) => {
    expect(bs).toBeTruthy();
  }));

  describe('#getPosts', () => {
    it('should return list of Observable<Post[]>', () => {
      const mockPosts: any[] = [
        {
          'id': '1',
          'title': 'post-1',
          'author': 'typicode'
        }
      ];

      service.getPosts().subscribe(posts => {
        expect(posts.length).toBe(mockPosts.length);
      });

      const req = httpMock.expectOne(`${API_URL}/posts`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts);
    });
  });

  describe('#getComments', () => {
    it('should return list of Observable<Comment[]>', () => {
      const fakeComments: Comment[] = [
        {
          'id': '1',
          'body': 'post-1 comment-1',
          'postId': '1'
        },
        {
          'id': '2',
          'body': 'post-2 comment-1',
          'postId': '2'
        },
      ];

      service.getComments().subscribe(comment => {
        expect(comment.length).toBe(2);
      });

      const req = httpMock.expectOne(`${API_URL}/comments`);
      expect(req.request.method).toBe('GET');
      req.flush(fakeComments);
    });
  });

  describe('#getCommentByPostId', () => {
    it('should return an Observable<Comment[] by Post ID>', () => {
      const mockPosts: any = {
          'id': '1',
          'title': 'post-1',
          'author': 'typicode'
        };

      service.getCommentByPostId(mockPosts.id).subscribe(response => {
        expect(response).toBe(mockPosts.id);
      });

      const req = httpMock.expectOne(`${API_URL}/comments?postId=${mockPosts.id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts.id);
    });
  });
});
