import { ReadablePost } from './queries/model/queries-model';

/**
 * Base de données en lecture
 */
export class PostReadRepository {
  private posts: ReadablePost[] = [];

  getByLike(): ReadablePost[] {
    return this.posts;
  }

  insert(post: ReadablePost) {
    this.posts.push(post);
    this.posts = this.sort();
  }

  addLike(id: string) {
    this.posts = this.posts.map(p => {
      if (p.id === id) {
        p.nbLikes++;
      }
      return p;
    });
    this.sort();
  }

  private sort() {
    return this.posts.sort((a, b) => b.nbLikes - a.nbLikes);
  }
}
