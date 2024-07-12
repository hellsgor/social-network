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
      return <Loader />;

    case 'success':
      return <PostListView postList={postListQuery.data.list} />;

    case 'error':
      console.error(postListQuery.error);

      return (
        <div>
          <span>Произошла ошибка:</span>
          <button onClick={refetch}>Повторить запрос</button>
        </div>
      );
  }
};
