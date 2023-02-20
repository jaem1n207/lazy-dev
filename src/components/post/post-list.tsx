import React, { forwardRef } from 'react';

import tw from 'twin.macro';

import Post from 'Types/post';

import Card from './card';

interface PostListProps {
  posts: Post[];
}

const PostList = forwardRef<HTMLOListElement, PostListProps>(({ posts }, ref) => {
  return (
    <ol ref={ref} id="post-list" css={tw`flex flex-col list-none gap-40pxr`}>
      {posts.map((data) => {
        return <Card key={data.slug} {...data} />;
      })}
    </ol>
  );
});

PostList.displayName = 'PostList';

export default PostList;
