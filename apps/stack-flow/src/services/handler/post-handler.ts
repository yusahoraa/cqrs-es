import { PostReadRepository } from '../../repositories/post-read-repository';
import { DomainEvent } from '../commands/model/domain.event';
import { WritePost } from '../commands/model/commands-model';

export class PostHandler {

  constructor(private readRepo: PostReadRepository) {
  }

  doIt(event: DomainEvent) {
    if (event.eventType === "CREATED_POST") {
      const content = event.content as WritePost;
      this.readRepo.insert({ id: content.id, nbLikes: 0, description: content.description });
    }
    if (event.eventType === "NEW_LIKE") {
      this.readRepo.addLike(event.content as string);
    }
  }
}
