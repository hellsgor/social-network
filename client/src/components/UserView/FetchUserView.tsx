import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../api/User';
import { queryClient } from '../../api/queryClient';
import { FC } from 'react';
import { Loader } from '../Loader';
import { UserView } from './UserView';
import { Button } from '../Button';

interface FetchUserViewProps {
  userId: string;
}

export const FetchUserView: FC<FetchUserViewProps> = ({ userId }) => {
  const userQuery = useQuery(
    {
      queryFn: () => fetchUser(userId),
      queryKey: ['users', userId],
    },
    queryClient,
  );

  switch (userQuery.status) {
    case 'pending':
      return <Loader />;

    case 'success':
      return <UserView user={userQuery.data} />;

    case 'error':
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
          <Button onClick={() => userQuery.refetch()} type="button" title="Повторить запрос" size="small" />
        </div>
      );
  }
};
