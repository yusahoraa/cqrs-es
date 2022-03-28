import { Test, TestingModule } from '@nestjs/testing';
import { PostWriteRepositoryService } from './post-write-repository.service';
import { WritePost } from '../services/commands/model/commands-model';

describe('PostReadWriteRepositoryService', () => {
  let service: PostWriteRepositoryService;

  beforeEach(async () => {
    service = new PostWriteRepositoryService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('save', () => {
    it('should create un id if it does not exist', () => {
      const post : WritePost = {likes: [], createdBy: "132", description: "Hello", id: null};

      service.save(post);
      expect(post.id).not.toBeNull();

      const retrievedPost = service.get(post.id);
      expect(retrievedPost).toEqual(post);
    })
  })
});
