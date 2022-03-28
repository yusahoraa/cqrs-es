import { Injectable } from '@nestjs/common';
import { ReadablePost } from './model/queries-model';
import { PostReadRepository } from '../../repositories/post-read-repository';

@Injectable()
export class GetFavoritePostQueryService {
  constructor(private repo: PostReadRepository) {
  }

  execute(): ReadablePost[] {
    return this.repo.getByLike();
  }
}
