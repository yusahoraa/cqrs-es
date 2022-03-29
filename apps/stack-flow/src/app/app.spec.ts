import { PostWriteRepositoryService } from '../write/post-write-repository.service';
import { CreatePostCommand } from '../write/commands/create-post-command.service';
import { LikePostCommand } from '../write/commands/like-post-command.service';
import { GetFavoritePostQuery } from '../read/queries/get-favorite-post-query.service';
import { PostReadRepository } from '../read/post-read-repository';
import { NewPostHandler } from '../synchro/handlers/new-post-handler';
import { EventBus } from '../synchro/core/event-bus';
import { NewLikeHandler } from '../synchro/handlers/new-like-handler';
import { UnlikePostCommand } from '../write/commands/unlike-post-command.service';
import { NewUnlikeHandler } from '../synchro/handlers/new-unlike-handler';

describe('integration', () => {
  let eventBus: EventBus;
  let newPostHandler: NewPostHandler;
  let newLikeHandler: NewLikeHandler;
  let unlikeHandler: NewUnlikeHandler;
  let writeRepo: PostWriteRepositoryService;
  let readRepo: PostReadRepository;
  let createPostCommand: CreatePostCommand;
  let likeCommand: LikePostCommand;
  let unlikeCommand: UnlikePostCommand;
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
    unlikeHandler = new NewUnlikeHandler(readRepo);
    createPostCommand = new CreatePostCommand(writeRepo, eventBus);
    likeCommand = new LikePostCommand(writeRepo, eventBus);
    unlikeCommand = new UnlikePostCommand(writeRepo, eventBus);
    query = new GetFavoritePostQuery(readRepo);

    eventBus.subscribe(newPostHandler);
    eventBus.subscribe(newLikeHandler);
    eventBus.subscribe(unlikeHandler);
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

  it('should work with unlike in normal cases', () => {
    const helloId = createPostCommand.execute(bob, 'Hello');
    likeCommand.execute(alice, helloId);
    unlikeCommand.execute(alice, helloId);

    const response = query.execute();
    expect(response).toHaveLength(1);
    expect(response[0].nbLikes).toBe(0);
  });

  it('should fail if user unliking has not liked before', () => {
    const helloId = createPostCommand.execute(bob, 'Hello');
    expect(() => unlikeCommand.execute(alice, helloId)).toThrow();
  });

  it('should fail if user unliking a post he has already unliked', () => {
    const helloId = createPostCommand.execute(bob, 'Hello');
    likeCommand.execute(alice, helloId);
    unlikeCommand.execute(alice, helloId);
    expect(() => unlikeCommand.execute(alice, helloId)).toThrow();
  });
});
