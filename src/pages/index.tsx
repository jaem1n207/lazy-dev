import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import queryString from 'query-string';

import CategoryFilter from 'Components/category/category-filter';
import { Grid, Spacer, H3, ContentSpacer, H5, Typography } from 'Components/common';
import AnimateFadeContainer from 'Components/common/animate-fade-container';
import AnimatedContainer from 'Components/common/animated-container';
import NoneActiveWrapper from 'Components/common/none-active-wrapper';
import HeroPostCard from 'Components/post/hero-post-card';
import PostCard from 'Components/post/post-card';
import RotatingTag from 'Components/rotating-tag';
import Seo from 'Components/seo';
import Tag from 'Components/tag';
import { useCategory } from 'Hooks/use-category';
import Layout from 'Layout/layout';
import { isEmptyArray, isEmptyString } from 'Libs/assertions';
import { filterPosts } from 'Libs/blog';
import { CATEGORY_TYPE } from 'Types/enum';
import Post from 'Types/post';

type ContextProps = {
  category: string;
};

const useUpdateQueryStringValueWithoutNavigation = (queryKey: string, queryValue: string) => {
  useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const oldQueryValue = currentSearchParams.get(queryKey) ?? '';
    if (queryValue === oldQueryValue) return;

    if (queryValue) {
      currentSearchParams.set(queryKey, queryValue);
    } else {
      currentSearchParams.delete(queryKey);
    }
    const newUrl = [window.location.pathname, currentSearchParams.toString()]
      .filter(Boolean)
      .join('?');
    window.history.replaceState(null, '', newUrl);
  }, [queryKey, queryValue]);
};

const IndexPage: FC<PageProps<Queries.HomeQuery, ContextProps>> = ({ data, location }) => {
  const [currentCategory, setCurrentCategory] = useState<string | undefined>();
  const { category, selectCategory, resetCategory } = useCategory();

  const isCategoryAll = useMemo(() => {
    return category === CATEGORY_TYPE.ALL;
  }, [category]);

  const heroPost = useMemo(() => {
    const heroPost = data.postsRemark.edges.find(
      (edge) => edge.node.frontmatter?.title === 'JS 객체 이해하기'
    );
    if (!heroPost) return undefined;

    const { slug } = heroPost.node.fields!;
    const { title, date, category, summary, thumbnail } = heroPost.node.frontmatter!;
    const { childImageSharp } = thumbnail!;
    const post: Post = {
      slug,
      title,
      date,
      category,
      summary,
      thumbnail: childImageSharp?.id!,
      timeToRead: heroPost.node.timeToRead,
      tags: heroPost.node.frontmatter?.tags!,
    };

    return post;
  }, [data.postsRemark.edges]);

  const categories = useMemo(() => data.categoriesGroup.group, [data.categoriesGroup.group]);

  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
    } else {
      setCurrentCategory(undefined);
    }
  }, [category]);

  const postData = data.postsRemark.edges;

  const refinedPosts = useMemo(() => {
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

  const [queryValue, setQuery] = useState<string>(() => {
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

  const searchResults = useMemo(() => {
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

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // 입력한 값이 태그와 일치함을 검사하기 위해 소문자로 변환
    setQuery(value.toLowerCase());
  };

  const handleClearSearch = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setQuery('');
  };

  useEffect(() => {
    if (queryString.parse(location.search).category) {
      setQuery('');
    }
  }, [location.search]);

  const resultsRef = useRef<HTMLOListElement>(null);
  const handleScrollToResults = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      if (resultsRef.current) {
        resultsRef.current.querySelector('a')?.focus({ preventScroll: true });
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const searchLabelBaseClasses =
    'absolute top-0pxr left-0pxr w-full h-full flex items-center pl-[10px] duration-200';
  const searchLabelFocusedClasses = classNames(
    {
      'group-focus-within:text-18pxr foldable:group-focus-within:text-16pxr mobile:group-focus-within:text-12pxr group-focus-within:h-5/6 group-focus-within:-translate-y-full group-focus-within:pl-0pxr':
        isEmptyString(queryValue),
    },
    {
      'h-5/6 -translate-y-full pl-0pxr text-18pxr foldable:text-16pxr mobile:text-14pxr':
        !isEmptyString(queryValue),
    }
  );
  const searchLabelClasses = classNames(searchLabelBaseClasses, searchLabelFocusedClasses);

  return (
    <Layout location={location} title={data.site?.siteMetadata?.title!}>
      <CategoryFilter
        category={category}
        categories={categories}
        selectCategory={selectCategory}
        resetCategory={resetCategory}
      />

      <Spacer size="xs" className="col-span-full" />

      {!isEmptyArray(tagsArray) && (
        <ContentSpacer>
          <Grid>
            <div className="select-none col-span-full">
              <Typography
                as="div"
                className="font-bold leading-tight text-64pxr tablet:text-48pxr foldable:text-32pxr"
              >
                <div className="text-[#3D3D3D]">원하는 글을 찾아보세요&#46;</div>
                <div className="flex">
                  <span>For&nbsp;</span>
                  <RotatingTag tags={tagsArray} interval={4000} rotationDuration={2} />
                </div>
              </Typography>

              <Spacer size="xs" />

              <div className="flex items-center justify-between my-24pxr">
                <div className="flex items-center">
                  <div className="relative group">
                    <NoneActiveWrapper>
                      <label className={searchLabelClasses} htmlFor="search-post-input">
                        What are you looking for?
                      </label>
                      <input
                        id="search-post-input"
                        type="text"
                        className="rounded-full w-[16em] foldable:w-[12em] bg-secondary outline-none py-12pxr px-16pxr text-18pxr foldable:text-16pxr focus-primary group-focus-within:bg-opacity-60"
                        value={queryValue}
                        onChange={handleSearchInputChange}
                        onKeyUp={handleScrollToResults}
                      />
                    </NoneActiveWrapper>
                  </div>
                  {queryValue.length > 0 && (
                    <button
                      data-hoverable="true"
                      type="button"
                      className="text-gray-500 ml-12pxr text-16pxr hover:text-gray-700 focus-primary"
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
                  <div className="ml-24pxr">
                    <span className="text-text text-16pxr">{posts.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </ContentSpacer>
      )}

      <Spacer size="xs" className="col-span-full" />
      <ContentSpacer className="mb-56pxr">
        <Grid>
          <H5 as="div" className="col-span-full mb-24pxr">
            Search blog by keyword
          </H5>
          <div className="flex flex-wrap col-span-10 desktop:col-span-full">
            {tagsArray.map((tag) => {
              if (!tag) return null;
              const selected = query.includes(tag);

              return (
                <Tag
                  key={tag}
                  tag={tag}
                  checked={selected}
                  onChange={() => toggleTag(tag)}
                  onKeyUp={handleScrollToResults}
                  /* disabled 조건에 해당되도 선택된 상태에서는 disabled를 해제한다. */
                  disabled={!visibleTags.has(tag) ? !selected : false}
                />
              );
            })}
          </div>
        </Grid>
      </ContentSpacer>

      <AnimatePresence>
        {heroPost && !isSearching && isCategoryAll && (
          <ContentSpacer className="mb-10pxr">
            <Grid>
              <div className="col-span-full">
                <AnimateFadeContainer>
                  <HeroPostCard post={heroPost} />
                </AnimateFadeContainer>
              </div>
            </Grid>
          </ContentSpacer>
        )}
      </AnimatePresence>

      <Spacer size="xs" className="col-span-full" />
      <AnimatePresence>
        <ContentSpacer ref={resultsRef}>
          {posts.length === 0 ? (
            <Grid className="mb-64">
              <H3 as="p" variant="secondary" className="col-span-full">
                No posts found.
              </H3>
            </Grid>
          ) : (
            <AnimatedContainer>
              <Grid className="mb-64">
                {posts.map((post) => (
                  <div key={post.slug} className="col-span-4 mb-40pxr">
                    <PostCard post={post} />
                  </div>
                ))}
              </Grid>
            </AnimatedContainer>
          )}
        </ContentSpacer>
      </AnimatePresence>
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
