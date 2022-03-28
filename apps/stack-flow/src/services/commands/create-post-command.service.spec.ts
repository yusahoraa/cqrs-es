import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostCommandService } from './create-post-command.service';
import { PostWriteRepositoryService } from '../../repositories/post-write-repository.service';

describe('CreatePostCommandService', () => {
  let repo: PostWriteRepositoryService;
  let service: CreatePostCommandService;


  beforeEach(async () => {
    repo = new PostWriteRepositoryService();
    service = new CreatePostCommandService(repo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should store the post inside the repo and return correct id', () => {
    const responseId = service.execute(123, "hello!");

    const savedPost = repo.get(responseId);

    expect(savedPost).toBeDefined();
    expect(savedPost.description).toBe('hello!');
  })
});
