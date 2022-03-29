import { PostWriteRepositoryService } from '../write/post-write-repository.service';
import { CreatePostCommand } from '../write/commands/create-post-command.service';
import { LikePostCommand } from '../write/commands/like-post-command.service';
import { GetFavoritePostQuery } from '../read/queries/get-favorite-post-query.service';
import { PostReadRepository } from '../read/post-read-repository';
import { NewPostHandler } from '../synchro/handlers/new-post-handler';
import { EventBus } from '../synchro/core/event-bus';
import { NewLikeHandler } from '../synchro/handlers/new-like-handler';

describe('integration', () => {
  let eventBus: EventBus;
  let newPostHandler: NewPostHandler;
  let newLikeHandler: NewLikeHandler;
  let writeRepo: PostWriteRepositoryService;
  let readRepo: PostReadRepository;
  let createPostCommand: CreatePostCommand;
  let likeCommand: LikePostCommand;
  let query: GetFavoritePostQuery;

  const alice = 456;
  const bob = 123;
  const carol = 789;

  beforeEach(() => {
    eventBus = new EventBus();

    writeRepo = new PostWriteRepositoryService();
    readRepo = new PostReadRepository();

    newPostHandler = new NewPostHandler(readRepo);
    newLikeHandler = new NewLikeHandler(readRepo);
    createPostCommand = new CreatePostCommand(writeRepo, eventBus);
    likeCommand = new LikePostCommand(writeRepo, eventBus);
    query = new GetFavoritePostQuery(readRepo);

    eventBus.subscribe(newPostHandler);
    eventBus.subscribe(newLikeHandler);
  });

  it('should work', () => {
    const helloId = createPostCommand.execute(bob, 'Hello');
    const worldId = createPostCommand.execute(bob, ' world!');

    likeCommand.execute(alice, helloId);
    likeCommand.execute(alice, worldId);

    likeCommand.execute(carol, worldId);

    const response = query.execute(); // <------- ULTRA RAPIDE
    expect(response).toHaveLength(2);
    expect(response[0].description).toBe(' world!');
  });
});
