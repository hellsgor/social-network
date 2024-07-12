import { z } from 'zod';

export const PostSchema = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.number(),
});

export const PostListSchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;

export type PostList = z.infer<typeof PostListSchema>;
