import { usePostList } from '../../api/Post';
import { Loader } from '../Loader';
import { PostListView } from './PostListView';

export const FetchPostListView = () => {
  const { state, refetch } = usePostList();

  switch (state.status) {
    case 'idle':
    case 'pending':
      return <Loader />;

    case 'success':
      return <PostListView postList={state.data} />;

    case 'error':
      console.error(state.error);

      return (
        <div>
          <span>Произошла ошибка:</span>
          <button onClick={refetch}>Повторить запрос</button>
        </div>
      );
  }
};
