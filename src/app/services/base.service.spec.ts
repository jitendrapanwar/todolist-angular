import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { API_URL } from '../app.endpoints';
import { BaseService, Post, Comment } from './base.service';


let injector: TestBed;
let service: BaseService;
let httpMock: HttpTestingController;

describe('BaseService', () => {

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

});

describe('#getPosts', () => {
  it('should return an Observable<Post[]>', () => {
    const fakePosts: Post[] = [
      {
        'id': '1',
        'title': 'post-1',
        'author': 'typicode',
        'comments': [
          {
            'id': '1',
            'body': 'post-1 comment-1',
            'postId': '1'
          }
        ]
      }
    ];

    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(1);
      expect(posts).toEqual(fakePosts);
    });

    const req = httpMock.expectOne(`${API_URL}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(fakePosts);
  });
});

describe('#getComments', () => {
  it('should return an Observable<Comment[]>', () => {
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
    const fakeComments: Comment[] = [
      {
        'id': '1',
        'body': 'post-1 comment-1',
        'postId': '1'
      }
    ];

    const postId = '1';

    service.getCommentByPostId(postId).subscribe(comment => {
      expect(comment.length).toBe(1);
    });

    const req = httpMock.expectOne(`${API_URL}/comments?postId=${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(fakeComments);
  });
});
