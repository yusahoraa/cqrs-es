import { Injectable } from '@nestjs/common';
import { DomainEvent } from '../synchro/core/domain.event';

/**
 * Se comporte comme la base de données
 */
@Injectable()
export class PostWriteRepositoryService {
  private allPostEvents = new Map<string, DomainEvent[]>();

  addEvent(postId: string, event: DomainEvent) {
    const postEvents = this.allPostEvents.get(postId) ?? [];
    postEvents.push(event);
    this.allPostEvents.set(postId, postEvents);
  }

  getEvents(postId: string): DomainEvent[] {
    return this.allPostEvents.get(postId) ?? [];
  }
}
