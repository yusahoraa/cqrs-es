import { Injectable } from '@nestjs/common';
import { WritePost } from '../services/commands/model/commands-model';
import {v4 as uuidV4} from 'uuid';
import { ReadablePost } from '../services/queries/model/queries-model';

/**
 * Se comporte comme la base de données
 */
@Injectable()
export class PostReadWriteRepositoryService {
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

  getByLikes(): ReadablePost[] {
    const allValues = [...this.allPosts.values()];
    const computed = allValues
      .sort((a,b) => b.likes.length - a.likes.length)
      .map(p => ({nbLikes: p.likes.length, description: p.description}));

    return computed
  }
}
