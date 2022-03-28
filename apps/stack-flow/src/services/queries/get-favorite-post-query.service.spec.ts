import { Test, TestingModule } from '@nestjs/testing';
import { GetFavoritePostQueryService } from './get-favorite-post-query.service';
import { PostWriteRepositoryService } from '../../repositories/post-write-repository.service';
import { ReadablePost } from './model/queries-model';

describe('GetFavoritePostQueryService', () => {
  let repo: PostWriteRepositoryService;
  let service: GetFavoritePostQueryService;

  beforeEach(async () => {
    repo = new PostWriteRepositoryService();
    service = new GetFavoritePostQueryService(repo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve post order by the most likes', () => {
    repo.save({id: '123', likes: [{userId: '456'}], description: "world!", createdBy: null});
    repo.save({id: 'abc', likes: [{userId: '456'}, {userId: '789'}], description: "hello", createdBy: null});

    const response: ReadablePost[] = service.execute();
    expect(response).toHaveLength(2);
    expect(response[0].description).toBe('hello');
  })
});
