import { TestBed, inject,getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { API_URL, REQUEST } from '../app.endpoints';

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

  it('should be created', inject([BaseService], (service: BaseService) => {
    expect(service).toBeTruthy();
  }));

});

describe('#getPosts', () => {
  const dummyPosts = [{
      "id": "1",
      "title": "Nodejs",
      "author": "Ryan"
    }]

  it('should return an Observable<Post[]>', () => {
    service.getPosts().subscribe(posts => {
      expect(posts).toEqual(dummyPosts);
    });
  });

  it('should fail when sending an non-expected request', () => {
    const req = httpMock.expectNone(`${API_URL}/fullposts`);
  })
   
});

describe('#getComments', () => {
  const dummyComments = [
    {
      "id": 1,
      "body": "some comment",
      "postId": 1
    }
  ]
   
  it('should return an Observable<Comments[]>', () => {
    const postId = 1;
    service.getCommentByPostId(postId).subscribe(comments => {
      expect(comments).toEqual(dummyComments);
    });
  });

  it('should fail when sending an non-expected request', () => {
    const req = httpMock.expectNone(`${API_URL}/comment`);
  })

});
