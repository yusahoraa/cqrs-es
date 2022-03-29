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
    this.setLike(id, 1);
  }

  private sort() {
    return this.posts.sort((a, b) => b.nbLikes - a.nbLikes);
  }

  removeLike(postId: string) {
    this.setLike(postId, -1);
  }

  private setLike(postId: string, nbLikes: number) {
    this.posts = this.posts.map((p) => {
      if (p.id === postId) {
        p.nbLikes += nbLikes;
      }
      return p;
    });
    this.sort();
  }
}
