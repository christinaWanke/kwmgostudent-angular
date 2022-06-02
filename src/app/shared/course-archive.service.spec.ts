import { TestBed } from '@angular/core/testing';

import { CourseArchiveService } from './course-archive.service';

describe('CourseArchiveService', () => {
  let service: CourseArchiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseArchiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
