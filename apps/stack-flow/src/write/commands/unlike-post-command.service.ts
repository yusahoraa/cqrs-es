import { Injectable } from '@nestjs/common';
import { PostWriteRepositoryService } from '../post-write-repository.service';
import { DomainEvent } from '../../synchro/core/domain.event';
import { EventBus } from '../../synchro/core/event-bus';
import { PostLike } from './model/commands-model';
import { ExistingPost } from './model/existing-post';

@Injectable()
export class UnlikePostCommand {
  constructor(
    private repo: PostWriteRepositoryService,
    private eventBus: EventBus
  ) {}

  execute(userId: number, postId: string) {
    this.checkOperationAllowed(userId, postId);
    this.createAndPublishEvent(userId, postId);
  }

  private createAndPublishEvent(userId: number, postId: string) {
    const domainEvent = new DomainEvent('NEW_UNLIKE', { userId, postId });
    this.repo.addEvent(postId, domainEvent);
    this.eventBus.publish(domainEvent);
  }

  private checkOperationAllowed(userId: number, postId: string) {
    const events = this.repo.getEvents(postId);
    const post = new ExistingPost(events);

    const userIdAsStr = userId.toString();
    if (!post.likes.some((l) => l.userId === userIdAsStr)) {
      throw Error('Not allowed!');
    }
  }
}
