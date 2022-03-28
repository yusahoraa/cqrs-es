import { PostWriteRepositoryService } from '../repositories/post-write-repository.service';
import { CreatePostCommandService } from '../services/commands/create-post-command.service';
import { LikePostCommandService } from '../services/commands/like-post-command.service';
import { GetFavoritePostQueryService } from '../services/queries/get-favorite-post-query.service';
import { PostReadRepository } from '../repositories/post-read-repository';
import { EventBus } from '../services/commands/model/domain.event';
import { PostHandler } from '../services/handler/post-handler';

describe('integration', () => {
  let eventBus: EventBus;
  let handler: PostHandler;
  let writeRepo: PostWriteRepositoryService;
  let readRepo: PostReadRepository;
  let createCommand : CreatePostCommandService;
  let likeCommand: LikePostCommandService;
  let query: GetFavoritePostQueryService;

  const alice = 456;
  const bob = 123
  const carol =  789;

  beforeEach(() => {
    eventBus = new EventBus();

    writeRepo = new PostWriteRepositoryService();
    readRepo = new PostReadRepository();

    handler = new PostHandler(readRepo);
    createCommand = new CreatePostCommandService(writeRepo, eventBus);
    likeCommand = new LikePostCommandService(writeRepo, eventBus);
    query = new GetFavoritePostQueryService(readRepo);

    eventBus.subscribe(handler);

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
