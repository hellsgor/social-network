import { FC } from 'react';
import { Post } from '../../api/Post';
import './PostView.css';

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
    timeStyle: 'medium',
  })}`;
}

interface PostViewProps {
  post: Post;
}

export const PostView: FC<PostViewProps> = ({ post }) => {
  return (
    <div className="post-view">
      <p className="post-view__text">{post.text}</p>

      <time className="post-view__time">{formatDate(post.createdAt)}</time>
    </div>
  );
};
