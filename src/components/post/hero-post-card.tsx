import React from 'react';

import Post from 'Types/post';

interface HeroPostCardProps {
  post: Post;
}

const HeroPostCard = ({ post }: HeroPostCardProps) => {
  return <div>{post.title}</div>;
};

export default HeroPostCard;
