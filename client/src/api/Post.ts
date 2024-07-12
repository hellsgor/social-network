import { z } from 'zod';

export const PostSchema = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.number(),
});
export type Post = z.infer<typeof PostSchema>;

export const PostListSchema = z.array(PostSchema);
export type PostList = z.infer<typeof PostListSchema>;

export const FetchPostListSchema = z.object({
  list: PostListSchema,
});
export type FetchPostListResponse = z.infer<typeof FetchPostListSchema>;

export function fetchPostList(): Promise<FetchPostListResponse> {
  return fetch('/api/posts')
    .then((response) => response.json)
    .then((data) => FetchPostListSchema.parse(data));
}
