import { z } from 'zod';
import { validateResponse } from './validateResponse';

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
    .then((response) => response.json())
    .then((data) => FetchPostListSchema.parse(data));
}

// interface IdleRequestState {
//   status: 'idle';
// }

// interface LoadingRequestState {
//   status: 'pending';
// }

// interface SuccessRequestState {
//   status: 'success';
//   data: PostList;
// }

// interface ErrorRequestState {
//   status: 'error';
//   error: unknown;
// }

// type RequestState = IdleRequestState | LoadingRequestState | SuccessRequestState | ErrorRequestState;

// export function usePostList() {
//   const [state, setState] = useState<RequestState>({ status: 'idle' });

//   useEffect(() => {
//     if (state.status === 'pending') {
//       fetchPostList()
//         .then((data) => {
//           setState({ status: 'success', data: data.list });
//         })
//         .catch((error) => {
//           setState({
//             status: 'error',
//             error: error,
//           });
//         });
//     }
//   }, [state]);

//   useEffect(() => {
//     setState({ status: 'pending' });
//   }, []);

//   const refetch = () => {
//     setState({ status: 'pending' });
//   };

//   return {
//     state,
//     refetch,
//   };
// }

export function createPost(text: string): Promise<void> {
  return fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
    .then(() => validateResponse)
    .then(() => undefined);
}
