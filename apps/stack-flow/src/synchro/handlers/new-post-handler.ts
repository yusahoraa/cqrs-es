import { PostReadRepository } from '../../read/post-read-repository';
import { DomainEvent } from '../core/domain.event';
import { WritePost } from '../../write/commands/model/commands-model';
import { IHandler } from '../core/event-bus';

export class NewPostHandler implements IHandler {
  constructor(private readRepo: PostReadRepository) {}

  handle(event: DomainEvent) {
    if (event.eventType !== 'CREATED_POST') return;

    const content = event.content as WritePost;
    this.readRepo.insert({
      id: content.id,
      nbLikes: 0,
      description: content.description,
    });
  }
}

