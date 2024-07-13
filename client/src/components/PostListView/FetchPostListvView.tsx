import { useQuery } from '@tanstack/react-query';
import { fetchPostList } from '../../api/Post';
import { Loader } from '../Loader';
import { PostListView } from './PostListView';
import { queryClient } from '../../api/queryClient';
import { Button } from '../Button';

export const FetchPostListView = () => {
  // const { state, refetch } = usePostList();

  const postListQuery = useQuery(
    {
      queryFn: () => fetchPostList(),
      queryKey: ['posts'],
    },
    queryClient,
  );

  switch (postListQuery.status) {
    case 'pending':
      return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem 0' }}>
          <Loader />
        </div>
      );

    case 'success':
      return <PostListView postList={postListQuery.data.list} />;

    case 'error':
      console.error(postListQuery.error);

      return (
        <div
          style={{
            display: 'flex',
            columnGap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem 0',
          }}
        >
          <span>Произошла ошибка:</span>
          <Button onClick={() => postListQuery.refetch()} type="button" title="Повторить запрос" size="small" />
        </div>
      );
  }
};
