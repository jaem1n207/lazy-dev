import PostCard from './post-card';

interface PostListProps {
  posts: Queries.HomeQuery['posts']['edges'];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <section className="foldable: w-full px-36pxr desktop:px-24pxr foldable:order-1 foldable:px-20pxr foldable:pt-36pxr">
      <h2 className="mb-16pxr text-24pxr font-bold foldable:text-20pxr">Posts</h2>
      <div className="grid grid-cols-2 gap-4 foldable:grid-cols-1 foldable:gap-2">
        {posts?.map((post) => <PostCard key={post.node.fields?.slug} post={post} />)}
      </div>
    </section>
  );
};

export default PostList;
