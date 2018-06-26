import { TestBed, inject,getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { API_URL, REQUEST } from '../app.endpoints';

import { BaseService } from './base.service';

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
      //expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });
  });

  it('should be GET request with endpoint /posts', () => {
    const req = httpMock.expectOne(`${API_URL}${REQUEST.GET_POSTS}`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyPosts);
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
    service.getComments().subscribe(comments => {
      expect(comments).toEqual(dummyComments);
    });
  });

  it('should be GET request with endpoint /comments', () => {
    const req = httpMock.expectOne(`${API_URL}${REQUEST.GET_COMMENTS}`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyComments);
  })
});

describe('#getProfile', () => {
  const dummyProfile = {
    "name": "typicode"
  }
   
  it('should return an Observable<Profile{}>', () => {
    service.getProfile().subscribe(profile => {
      expect(profile).toEqual(dummyProfile);
    });
  });

  it('should be GET request with endpoint /profile', () => {
    const req = httpMock.expectOne(`${API_URL}${REQUEST.GET_PROFILE}`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyProfile);
  })
});

