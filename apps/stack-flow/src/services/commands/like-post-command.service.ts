import { Injectable } from '@nestjs/common';
import { PostReadWriteRepositoryService } from '../../repositories/post-read-write-repository.service';

@Injectable()
export class LikePostCommandService {
  constructor(private repo: PostReadWriteRepositoryService) {

  }

  execute(userId: number, postId: string) {
    const post = this.repo.get(postId);
    const userIdAsStr = userId.toString();

    if (!post) {
      throw Error("Post does not exist");
    }

    if (post.createdBy === userIdAsStr || post.likes.some(l => l.userId === userIdAsStr)) {
      throw Error("Cannot like");
    }
    post.likes.push({userId: userIdAsStr.toString()});
    this.repo.save(post);
  }
}
