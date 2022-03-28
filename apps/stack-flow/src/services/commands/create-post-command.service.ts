import { Injectable } from '@nestjs/common';
import { PostWriteRepositoryService } from '../../repositories/post-write-repository.service';
import { WritePost } from './model/commands-model';
import { DomainEvent, EventBus } from './model/domain.event';

@Injectable()
export class CreatePostCommandService {

  constructor(private repo: PostWriteRepositoryService,
              private eventBus: EventBus) {
  }

  execute(userId: number, description: string): string {
    const post: WritePost = {id: null, description, createdBy: userId.toString(), likes: []};
    this.repo.save(post);

    this.eventBus.publish(new DomainEvent("CREATED_POST", post));

    return post.id;
  }
}
