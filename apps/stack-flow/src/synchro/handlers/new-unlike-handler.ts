import { IHandler } from '../core/event-bus';
import { PostReadRepository } from '../../read/post-read-repository';
import { DomainEvent } from '../core/domain.event';

export class NewUnlikeHandler implements IHandler {
  constructor(private readRepo: PostReadRepository) {}

  handle(event: DomainEvent): void {
    if (event.eventType !== 'NEW_UNLIKE') return;
    const content = event.content as any;
    this.readRepo.removeLike(content.postId as string);
  }
}
