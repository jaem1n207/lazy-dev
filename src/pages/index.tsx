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

const IndexPage: React.FC<PageProps<Queries.HomeQuery, ContextProps>> = ({ data, location }) => {
  const [currentCategory, setCurrentCategory] = React.useState<string | undefined>();
  const { category, selectCategory, resetCategory } = useCategory();

  const totalCountPosts = data.postsRemark.totalCount;

  const tags = React.useMemo(() => data.tagsGroup.group, [data.tagsGroup.group]);

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
          tags: edge.node.frontmatter?.tags!,
        };

        return post;
      });

    return filteredPosts;
  }, [currentCategory, postData]);

  const tagsSet = new Set(refinedPosts.flatMap((post) => post.tags).filter(Boolean));
  const tagsArray = Array.from(tagsSet);

  const [queryValue, setQuery] = React.useState<string>(() => {
    return (queryString.parse(location.search).q as string) ?? '';
  });
  const query = queryValue.trim();
  useUpdateQueryStringValueWithoutNavigation('q', query);

  const toggleTag = (tag: string) => {
    setQuery((prevQuery) => {
      const expression = new RegExp(tag, 'ig');

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
    ? new Set(searchResults.flatMap((post) => post.tags).filter(Boolean))
    : new Set(tagsArray);

  const posts = isSearching ? searchResults : refinedPosts;

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  const handleClearSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setQuery('');
  };

  React.useEffect(() => {
    if (queryString.parse(location.search).category) {
      setQuery('');
    }
  }, [location.search]);

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
          {tagsArray.map((tag) => {
            if (!tag) return null;
            const selected = query.includes(tag);

            return (
              <Tag
                key={tag}
                tag={tag}
                checked={selected}
                onChange={() => toggleTag(tag)}
                /* disabled 조건에 해당되도 선택된 상태에서는 disabled를 해제한다. */
                disabled={!visibleTags.has(tag) ? !selected : false}
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

export default IndexPage;

export const Head: HeadFC = ({ location }: HeadProps) => (
  <Seo title="Home" pathname={location.pathname} />
);

export const pageQuery = graphql`
  query Home {
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
        totalCount
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
            tags
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
