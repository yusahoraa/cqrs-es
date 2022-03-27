import { Test, TestingModule } from '@nestjs/testing';
import { LikePostCommandService } from './like-post-command.service';

describe('LikePostCommandService', () => {
  let service: LikePostCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikePostCommandService],
    }).compile();

    service = module.get<LikePostCommandService>(LikePostCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
