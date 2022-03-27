import { Test, TestingModule } from '@nestjs/testing';
import { PostReadWriteRepositoryService } from './post-read-write-repository.service';

describe('PostReadWriteRepositoryService', () => {
  let service: PostReadWriteRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostReadWriteRepositoryService],
    }).compile();

    service = module.get<PostReadWriteRepositoryService>(PostReadWriteRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
