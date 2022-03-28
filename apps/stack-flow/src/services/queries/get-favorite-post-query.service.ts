import { Injectable } from '@nestjs/common';
import { PostReadWriteRepositoryService } from '../../repositories/post-read-write-repository.service';
import { ReadablePost } from './model/queries-model';

@Injectable()
export class GetFavoritePostQueryService {
  constructor(private repo: PostReadWriteRepositoryService) {
  }

  execute(): ReadablePost[] {
    return this.repo.getByLikes();
  }
}
