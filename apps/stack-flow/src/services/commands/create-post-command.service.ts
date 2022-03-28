import { Injectable } from '@nestjs/common';
import { PostReadWriteRepositoryService } from '../../repositories/post-read-write-repository.service';
import { WritePost } from './model/commands-model';

@Injectable()
export class CreatePostCommandService {

  constructor(private repo: PostReadWriteRepositoryService) {
  }

  execute(userId: number, description: string): string {
    const post: WritePost = {id: null, description, createdBy: userId.toString(), likes: []};
    this.repo.save(post);
    return post.id;
  }
}
