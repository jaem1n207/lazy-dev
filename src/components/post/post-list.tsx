import React from 'react';

import tw from 'twin.macro';

import Post from 'Types/post';

import Card from './card';

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <ol css={tw`flex flex-col list-none gap-40pxr`}>
      {posts.map((data) => {
        return <Card key={data.slug} {...data} />;
      })}
    </ol>
  );
};

export default PostList;
