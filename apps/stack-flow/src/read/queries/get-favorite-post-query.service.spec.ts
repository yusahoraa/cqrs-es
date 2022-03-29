import { GetFavoritePostQuery } from './get-favorite-post-query.service';
import { ReadablePost } from './model/queries-model';
import { PostReadRepository } from '../post-read-repository';

describe('GetFavoritePostQueryService', () => {
  let repo: PostReadRepository;
  let service: GetFavoritePostQuery;

  beforeEach(async () => {
    repo = new PostReadRepository();
    service = new GetFavoritePostQuery(repo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve post order by the most likes', () => {
    repo.insert({
      id: '123',
      description: 'world!',
      nbLikes: 1,
    });
    repo.insert({
      id: '234',
      description: 'hello',
      nbLikes: 2,
    });

    const response: ReadablePost[] = service.execute();
    expect(response).toHaveLength(2);
    expect(response[0].description).toBe('hello');
  });
});
