import { Test, TestingModule } from '@nestjs/testing';
import { GetFavoritePostQueryService } from './get-favorite-post-query.service';

describe('GetFavoritePostQueryService', () => {
  let service: GetFavoritePostQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetFavoritePostQueryService],
    }).compile();

    service = module.get<GetFavoritePostQueryService>(GetFavoritePostQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
