import { PostReadWriteRepositoryService } from '../repositories/post-read-write-repository.service';
import { CreatePostCommandService } from '../services/commands/create-post-command.service';
import { LikePostCommandService } from '../services/commands/like-post-command.service';
import { GetFavoritePostQueryService } from '../services/queries/get-favorite-post-query.service';

describe('integration', () => {
  let repo: PostReadWriteRepositoryService;
  let createCommand : CreatePostCommandService;
  let likeCommand: LikePostCommandService;
  let query: GetFavoritePostQueryService;

  const alice = 456;
  const bob = 123
  const carol =  789;

  beforeEach(() => {
    repo = new PostReadWriteRepositoryService();
    createCommand = new CreatePostCommandService(repo);
    likeCommand = new LikePostCommandService(repo);
    query = new GetFavoritePostQueryService(repo);
  });

  it('should work', () => {
    const helloId = createCommand.execute(bob, "Hello");
    const worldId = createCommand.execute(bob, " world!");

    likeCommand.execute(alice, helloId);
    likeCommand.execute(alice, worldId);

    likeCommand.execute(carol, worldId);

    const response = query.execute();
    expect(response).toHaveLength(2);
    expect(response[0].description).toBe(' world!');

  })
})
