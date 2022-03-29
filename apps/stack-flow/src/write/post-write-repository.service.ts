import { Injectable } from '@nestjs/common';
import { WritePost } from './commands/model/commands-model';
import {v4 as uuidV4} from 'uuid';

/**
 * Se comporte comme la base de données
 */
@Injectable()
export class PostWriteRepositoryService {
  private allPosts = new Map<string, WritePost>();

  save(post: WritePost) {
    if (!post.id) {
      post.id = uuidV4();
    }
    this.allPosts.set(post.id, post);
  }

  get(id: string): WritePost {
    return this.allPosts.get(id);
  }
}
