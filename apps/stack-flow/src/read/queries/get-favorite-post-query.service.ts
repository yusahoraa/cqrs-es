import { Injectable } from '@nestjs/common';
import { ReadablePost } from './model/queries-model';
import { PostReadRepository } from '../post-read-repository';

@Injectable()
export class GetFavoritePostQuery {
  constructor(private repo: PostReadRepository) {
  }

  execute(): ReadablePost[] {
    return this.repo.getByLike();
  }
}
