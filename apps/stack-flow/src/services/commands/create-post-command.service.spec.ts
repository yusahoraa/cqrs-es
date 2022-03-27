import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostCommandService } from './create-post-command.service';

describe('CreatePostCommandService', () => {
  let service: CreatePostCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePostCommandService],
    }).compile();

    service = module.get<CreatePostCommandService>(CreatePostCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
