import { Injectable } from '@nestjs/common';
import { PostWriteRepositoryService } from '../../repositories/post-write-repository.service';
import { DomainEvent, EventBus } from './model/domain.event';

@Injectable()
export class LikePostCommandService {
  constructor(private repo: PostWriteRepositoryService, private eventBus: EventBus) {

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
    this.eventBus.publish(new DomainEvent("NEW_LIKE", postId));
  }
}
