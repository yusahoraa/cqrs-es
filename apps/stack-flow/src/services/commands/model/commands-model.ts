export interface PostLike {
  userId: string;
}

export interface WritePost {
  id: string;
  description: string;
  likes: PostLike[];
  createdBy: string;
}
