import { Injectable } from '@nestjs/common';
import { PostWriteRepositoryService } from '../post-write-repository.service';
import { DomainEvent } from '../../synchro/core/domain.event';
import { EventBus } from '../../synchro/core/event-bus';
import { ExistingPost } from './model/existing-post';

@Injectable()
export class LikePostCommand {
  constructor(
    private repo: PostWriteRepositoryService,
    private eventBus: EventBus
  ) {}

  execute(userId: number, postId: string) {
    const userIdAsStr = userId.toString();

    const postEvents = this.repo.getEvents(postId);
    if (postEvents.length === 0) {
      throw Error('Post does not exist');
    }
    const existingPost = new ExistingPost(postEvents);
    if (
      this.isTheCreatorTheOneLiking(existingPost, userIdAsStr) ||
      this.hasUserAlreadyLiked(existingPost, userIdAsStr)
    ) {
      throw Error('Cannot like');
    }

    const domainEvent = new DomainEvent('NEW_LIKE', {
      postId,
      userId: userIdAsStr,
    });
    this.repo.addEvent(postId, domainEvent);
    this.eventBus.publish(domainEvent);
  }

  private hasUserAlreadyLiked(existingPost: ExistingPost, userIdAsStr: string) {
    return existingPost.likes.some((l) => l.userId === userIdAsStr);
  }

  private isTheCreatorTheOneLiking(
    existingPost: ExistingPost,
    userIdAsStr: string
  ) {
    return existingPost.createdBy === userIdAsStr;
  }
}
