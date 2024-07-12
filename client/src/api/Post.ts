export interface Post {
  id: string;
  text: string;
  authorId: string;
  createdAt: number;
}

export type PostList = Post[];
