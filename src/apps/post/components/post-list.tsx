import React from 'react';

import PostCard from './post-card';

interface PostListProps {
  posts: Queries.HomeQuery['posts']['edges'];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <section className="w-full px-36pxr desktop:px-24pxr foldable:order-1 foldable: foldable:px-20pxr foldable:pt-36pxr">
      <h2 className="font-bold text-24pxr foldable:text-20pxr mb-16pxr">Posts</h2>
      <div className="grid grid-cols-2 gap-24pxr foldable:grid-cols-1">
        {posts?.map((post) => (
          <PostCard key={post.node.fields?.slug} post={post} />
        ))}
      </div>
    </section>
  );
};

export default PostList;
