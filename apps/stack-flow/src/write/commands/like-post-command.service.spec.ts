import { Test, TestingModule } from '@nestjs/testing';
import { LikePostCommand } from './like-post-command.service';
import { PostWriteRepositoryService } from '../post-write-repository.service';

describe('LikePostCommandService', () => {
  let repo: PostWriteRepositoryService;
  let service: LikePostCommand;

  beforeEach(async () => {
    repo = new PostWriteRepositoryService();
    service = new LikePostCommand(repo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fail if post does not exist', () => {
    expect(() => service.execute(123, 'unknown')).toThrow();
  });

  describe('when post does exist', () => {
    let id: string;
    beforeEach(() => {
      id = "12345";
      repo.save({id, description: "hello", likes: [], createdBy: '123'});
    });

    it('should add the like', () => {
      service.execute(456, id);
      expect(repo.get(id).likes).toHaveLength(1);
    })

    it('should throw if user liking is the creating', () => {
      expect(() => service.execute(123, id)).toThrow();
    })

    it('should throw if user already likes the post', () => {
      service.execute(456, id);
      expect(() => service.execute(456, id)).toThrow();
    })
  })
});
