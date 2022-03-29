import { CreatePostCommand } from './create-post-command.service';
import { PostWriteRepositoryService } from '../post-write-repository.service';
import { EventBus } from '../../synchro/core/event-bus';

describe('CreatePostCommandService', () => {
  let repo: PostWriteRepositoryService;
  let eventBus: EventBus;
  let service: CreatePostCommand;

  beforeEach(async () => {
    repo = new PostWriteRepositoryService();
    eventBus = new EventBus();
    service = new CreatePostCommand(repo, eventBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should store the post inside the repo and return correct id', () => {
    const responseId = service.execute(123, 'hello!');

    const savedPost = repo.get(responseId);

    expect(savedPost).toBeDefined();
    expect(savedPost.description).toBe('hello!');
  });
});
