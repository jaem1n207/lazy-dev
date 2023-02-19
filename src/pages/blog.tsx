import * as React from 'react';

import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import queryString from 'query-string';

import CategoryFilter from 'Components/category/category-filter';
import PostList from 'Components/post/post-list';
import Seo from 'Components/seo';
import Tag from 'Components/Tag';
import { useCategory } from 'Hooks/use-category';
import Layout from 'Layout/layout';
import { filterPosts } from 'Libs/blog';
import { firstLetterUppercase } from 'Libs/string';
import { CATEGORY_TYPE } from 'Types/enum';
import Post from 'Types/post';

type ContextProps = {
  category: string;
};

const useUpdateQueryStringValueWithoutNavigation = (queryKey: string, queryValue: string) => {
  const [previousQueryValue, setPreviousQueryValue] = React.useState(queryValue);

  React.useEffect(() => {
    if (queryValue !== previousQueryValue) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(queryKey, queryValue);
      window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
      setPreviousQueryValue(queryValue);
    }
  }, [queryKey, queryValue, previousQueryValue]);
};

const BlogPage: React.FC<PageProps<Queries.BlogQuery, ContextProps>> = ({ data, location }) => {
  const [currentCategory, setCurrentCategory] = React.useState<string | undefined>();
  const { category, selectCategory, resetCategory } = useCategory();

  const totalCountPosts = data.postsRemark.totalCount;

  const tags = React.useMemo(() => data.tagsGroup.group, [data.tagsGroup.group]);
  // const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const categories = React.useMemo(() => data.categoriesGroup.group, [data.categoriesGroup.group]);
  React.useEffect(() => {
    if (category) {
      setCurrentCategory(category);
    } else {
      setCurrentCategory(undefined);
    }
  }, [category]);

  const postData = data.postsRemark.edges;

  const refinedPosts = React.useMemo(() => {
    const filteredPosts = postData
      .filter((post) => {
        if (currentCategory === CATEGORY_TYPE.ALL) {
          return true;
        } else {
          return post.node.frontmatter?.category === currentCategory;
        }
      })
      .map((edge) => {
        const { slug } = edge.node.fields!;
        const { title, date, category, summary, thumbnail } = edge.node.frontmatter!;
        const { childImageSharp } = thumbnail!;
        const post: Post = {
          slug,
          title,
          date,
          category,
          summary,
          thumbnail: childImageSharp?.id!,
          timeToRead: edge.node.timeToRead,
          tags: tags.map((tag) => tag.fieldValue!),
        };

        return post;
      });

    return filteredPosts;
  }, [currentCategory, postData, tags]);

  const [queryValue, setQuery] = React.useState<string>(() => {
    const query = queryString.parse(window.location.search);
    return query.q ? query.q.toString() : '';
  });
  const query = queryValue.trim();
  useUpdateQueryStringValueWithoutNavigation('q', query);

  // const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { checked, value } = e.target;
  //   if (checked) {
  //     setSelectedTags([...selectedTags, value]);
  //     setQuery((prevQuery) => `${prevQuery} ${value}`.trim());
  //   } else {
  //     setSelectedTags(selectedTags.filter((tag) => tag !== value));
  //     setQuery((prevQuery) => prevQuery.replace(value, '').trim());
  //   }
  // };

  const toggleTag = (tag: string) => {
    setQuery((prevQuery) => {
      const expression = new RegExp(tag, 'ig');
      console.log(prevQuery, expression.test(prevQuery));

      const newQuery = expression.test(prevQuery)
        ? prevQuery.replace(expression, '')
        : `${prevQuery} ${tag}`;

      return newQuery.replace(/\s+/g, ' ').trim();
    });
  };

  const isSearching = query.length > 0;

  const searchResults = React.useMemo(() => {
    if (isSearching) {
      return filterPosts(refinedPosts, query);
    } else {
      return [];
    }
  }, [isSearching, query, refinedPosts]);

  const visibleTags = isSearching
    ? new Set(searchResults.flatMap((post) => post.category).filter(Boolean))
    : new Set(tags.map((tag) => tag.fieldValue!));

  const posts = isSearching ? searchResults : refinedPosts;

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);

    // const inputTags = isSearching ? value.split(' ') : [];
    // const newSelectedTags = inputTags.filter((tag) => !selectedTags.includes(tag));

    // setSelectedTags([...selectedTags, ...newSelectedTags]);
  };

  const handleClearSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setQuery('');
    // setSelectedTags([]);
  };

  // React.useEffect(() => {
  //   const query = queryString.parse(window.location.search);
  //   if (query.q) {
  //     const inputTags = query.q.toString().split(' ');
  //     setSelectedTags(inputTags);
  //   }
  // }, []);

  return (
    <Layout location={location} title={data.site?.siteMetadata?.title!}>
      <CategoryFilter
        category={category}
        categories={categories}
        selectCategory={selectCategory}
        resetCategory={resetCategory}
      />
      <div className="flex items-center justify-between mb-24pxr">
        <div className="flex items-center">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search"
            className="rounded-full w-320pxr h-40pxr px-24pxr py-12pxr text-16pxr focus:outline-none focus:ring-2 focus:ring-primary"
            value={queryValue}
            onChange={handleSearchInputChange}
          />
          {queryValue.length > 0 && (
            <button
              type="button"
              className="text-gray-500 ml-12pxr text-16pxr hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={handleClearSearch}
            >
              <span className="sr-only">Clear search</span>
              <svg
                className="w-16pxr h-16pxr"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-24pxr">
        <div className="flex flex-wrap">
          {tags.map((tag) => {
            const selected = query.includes(tag.fieldValue!);

            return (
              <Tag
                key={tag.fieldValue}
                tag={tag.fieldValue!}
                checked={selected}
                onChange={() => toggleTag(tag.fieldValue!)}
                disabled={Boolean(!visibleTags.has(tag.fieldValue!) ? !selected : false)}
              />
            );
          })}
        </div>
      </div>
      <hr className="mb-24pxr" />
      <h2 className="font-bold text-32pxr mb-24pxr tablet:text-28pxr">
        {currentCategory ? firstLetterUppercase(currentCategory) : CATEGORY_TYPE.ALL} Posts
      </h2>
      <p className="text-16pxr mb-24pxr tablet:text-14pxr">
        {posts.length} of {totalCountPosts} posts
      </p>
      <PostList posts={posts} />
    </Layout>
  );
};

export default BlogPage;

export const Head: HeadFC = ({ location }: HeadProps) => (
  <Seo title="Blogs" pathname={location.pathname} />
);

export const pageQuery = graphql`
  query Blog {
    site {
      siteMetadata {
        title
      }
    }
    categoriesGroup: allMarkdownRemark(
      filter: { frontmatter: { category: { ne: "null" } } }
      sort: { frontmatter: { category: ASC } }
    ) {
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
      }
    }
    tagsGroup: allMarkdownRemark(
      filter: { frontmatter: { tags: { ne: "null" } } }
      sort: { frontmatter: { tags: ASC } }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
      }
    }
    postsRemark: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(content|blog)/" }
        frontmatter: { category: { ne: "null" }, tags: { ne: "null" } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YY")
            title
            category
            summary
            thumbnail {
              childImageSharp {
                id
              }
              base
            }
          }
        }
      }
      totalCount
    }
  }
`;
