import { Test, TestingModule } from '@nestjs/testing';
import { PostReadWriteRepositoryService } from './post-read-write-repository.service';
import { WritePost } from '../services/commands/model/commands-model';

describe('PostReadWriteRepositoryService', () => {
  let service: PostReadWriteRepositoryService;

  beforeEach(async () => {
    service = new PostReadWriteRepositoryService();
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
