import { PostLike } from './commands-model';
import { DomainEvent } from '../../../synchro/core/domain.event';

export class ExistingPost {
  description: string;
  likes: PostLike[] = [];
  createdBy: string;

  constructor(events: DomainEvent[]) {
    events.forEach((e) => {
      if (e.eventType === 'CREATED_POST') {
        const content = e.content as any;
        this.description = content.description;
        this.createdBy = content.createdBy;
      } else if (e.eventType === 'NEW_LIKE') {
        const content = e.content as any;
        this.likes.push({ userId: content.userId });
      } else if (e.eventType === 'NEW_UNLIKE') {
        const content = e.content as any;
        this.likes = this.likes.filter((l) => l.userId !== content.userId);
      }
    });
  }
}
