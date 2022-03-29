import { Injectable } from '@nestjs/common';
import { PostWriteRepositoryService } from '../post-write-repository.service';
import { WritePost } from './model/commands-model';
import { DomainEvent } from '../../synchro/core/domain.event';
import { EventBus } from '../../synchro/core/event-bus';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class CreatePostCommand {
  constructor(
    private repo: PostWriteRepositoryService,
    private eventBus: EventBus
  ) {}

  execute(userId: number, description: string): string {
    const post: WritePost = {
      id: uuidV4(),
      description,
      createdBy: userId.toString(),
      likes: [],
    };

    const domainEvent = new DomainEvent('CREATED_POST', post);
    this.repo.addEvent(post.id, domainEvent);
    this.eventBus.publish(domainEvent);

    return post.id;
  }
}
