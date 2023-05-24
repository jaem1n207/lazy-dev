import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import queryString from 'query-string';

import CategoryFilter from 'Components/category/category-filter';
import { Grid, Spacer, H3, ContentSpacer, Typography, H5 } from 'Components/common';
import AnimateFadeContainer from 'Components/common/animate-fade-container';
import NoneActiveWrapper from 'Components/common/none-active-wrapper';
import Skeleton from 'Components/common/skeleton';
import SSRSuspense from 'Components/common/ssr-suspense';
import RotatingTag from 'Components/rotating-tag';
import Seo from 'Components/seo';
import Tag from 'Components/tag';
import { useCategory } from 'Hooks/use-category';
import Layout from 'Layout/layout';
import { isEmptyArray, isEmptyString } from 'Libs/assertions';
import { filterPosts } from 'Libs/blog';
import { CATEGORY_TYPE, QUERY_PARAM } from 'Types/enum';
import Post from 'Types/post';

const HeroPostCard = lazy(() => import('Components/post/hero-post-card'));
const PostCard = lazy(() => import('Components/post/post-card'));

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

const FeaturedPostTitle = 'JavaScript에서 내장 객체를 확장하는 것이 위험한 이유';

const IndexPage: FC<PageProps<Queries.HomeQuery, ContextProps>> = ({ data, location }) => {
  console.log('🚀 ~ file: index.tsx:62 ~ data:', data);
  const [currentCategory, setCurrentCategory] = useState<string | undefined>();
  const { category, selectCategory, resetCategory } = useCategory();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const isCategoryAll = useMemo(() => {
    return category === CATEGORY_TYPE.ALL;
  }, [category]);

  const heroPost = useMemo(() => {
    const heroPost = data.postsRemark.edges.find(
      (edge) => edge.node.frontmatter?.title === FeaturedPostTitle
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

  const [queryValue, setQueryValue] = useState<string>(() => {
    return (queryString.parse(location.search)[QUERY_PARAM.KEYWORDS] as string) ?? '';
  });
  const query = queryValue.trim();
  useUpdateQueryStringValueWithoutNavigation(QUERY_PARAM.KEYWORDS, query);

  const toggleTag = (tag: string) => {
    setQueryValue((prevQuery) => {
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
    setQueryValue(value.toLowerCase());
  };

  const handleClearSearch = () => {
    setQueryValue('');
    searchInputRef.current?.focus();
  };

  const resultsRef = useRef<HTMLOListElement>(null);
  const handleScrollToResults = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      if (resultsRef.current) {
        resultsRef.current.querySelector('a')?.focus({ preventScroll: true });
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectCategory = (category: string) => {
    selectCategory(category);
    setQueryValue('');
  };
  const handleResetCategory = () => {
    resetCategory();
    setQueryValue('');
  };

  const searchLabelBaseClasses =
    'absolute top-0pxr left-0pxr w-full h-full flex items-center duration-200 pl-40pxr';
  const searchLabelFocusedClasses = classNames(
    {
      'group-focus-within:text-18pxr foldable:group-focus-within:text-16pxr mobile:group-focus-within:text-12pxr group-focus-within:h-5/6 group-focus-within:-translate-y-full group-focus-within:pl-0pxr':
        isEmptyString(queryValue),
    },
    {
      'h-5/6 -translate-y-full group-focus-within:pl-0pxr pl-0pxr text-18pxr foldable:text-16pxr mobile:text-14pxr':
        !isEmptyString(queryValue),
    }
  );
  const searchLabelClasses = classNames(searchLabelBaseClasses, searchLabelFocusedClasses);

  return (
    <Layout location={location} title={data.site?.siteMetadata?.title!}>
      <CategoryFilter
        category={category}
        categories={categories}
        selectCategory={handleSelectCategory}
        resetCategory={handleResetCategory}
      />

      <Spacer size="sm" className="col-span-full" />

      {!isEmptyArray(tagsArray) && (
        <ContentSpacer>
          <Grid>
            <div className="select-none col-span-full">
              <Typography
                as="div"
                className="font-bold leading-tight text-64pxr tablet:text-48pxr foldable:text-32pxr"
              >
                <div className="gradient-text">원하는 글을 찾아보세요&#46;</div>
                <div className="flex">
                  <span>Find&nbsp;</span>
                  <RotatingTag tags={tagsArray} interval={4000} rotationDuration={2} />
                </div>
              </Typography>

              <Spacer size="sm" />

              <div className="flex items-center justify-between my-24pxr col-span-full">
                <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                  <NoneActiveWrapper>
                    <button
                      title="Search"
                      className="absolute z-10 flex items-center h-full top-0pxr left-12pxr w-24pxr text-text-primary"
                    >
                      <MagnifyingGlassIcon />
                    </button>
                  </NoneActiveWrapper>
                  <div className="relative group">
                    <NoneActiveWrapper>
                      <label className={searchLabelClasses} htmlFor="search-post-input">
                        무엇을 찾고 계신가요?
                      </label>
                      <input
                        ref={searchInputRef}
                        id="search-post-input"
                        type="search"
                        className="w-full rounded-full outline-none appearance-none bg-bg-secondary py-24pxr foldable:py-12pxr pl-48pxr pr-64pxr text-18pxr foldable:text-16pxr focus-primary group-focus-within:bg-opacity-60 border-1pxr border-border-secondary"
                        value={queryValue}
                        onChange={handleSearchInputChange}
                        onKeyUp={handleScrollToResults}
                      />
                    </NoneActiveWrapper>
                  </div>
                  <AnimatePresence>
                    {queryValue.length > 0 && (
                      <NoneActiveWrapper>
                        <motion.button
                          aria-label="Clear search"
                          title="Clear search"
                          data-hoverable="true"
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          initial={{ opacity: 0 }}
                          type="reset"
                          className="absolute my-auto -translate-y-1/2 rounded-full focus-primary right-36pxr top-1/2 text-text-primary mr-8pxr"
                          onClick={handleClearSearch}
                          tabIndex={-1}
                        >
                          <span className="sr-only">Clear search</span>
                          <XMarkIcon className="w-24pxr h-24pxr" />
                        </motion.button>
                      </NoneActiveWrapper>
                    )}
                  </AnimatePresence>
                  <div className="absolute flex items-center h-full top-0pxr right-4pxr w-32pxr text-text-primary">
                    {posts.length}
                  </div>
                </form>
              </div>
            </div>
          </Grid>
        </ContentSpacer>
      )}

      <Spacer size="sm" className="col-span-full" />

      <ContentSpacer className="mb-56pxr">
        <Grid>
          <H5 as="div" className="col-span-full mb-24pxr">
            키워드로 원하는 글을 찾아보세요
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

      <SSRSuspense
        fallback={
          <Skeleton className="mx-10vw">
            <Skeleton.Item>
              <div className="max-w-7xl h-[26.875rem] rounded-lg foldable:h-400pxr tablet:h-300pxr" />
              <Spacer size="xs" className="col-span-full" data-skeleton-exclude-bg="true" />
            </Skeleton.Item>
          </Skeleton>
        }
      >
        {heroPost && !isSearching && isCategoryAll && <HeroPostCard post={heroPost} />}
      </SSRSuspense>

      <ContentSpacer ref={resultsRef}>
        {isEmptyArray(posts) ? (
          <Grid className="mb-64pxr">
            <div className="flex flex-col items-center col-span-full">
              <StaticImage
                draggable={false}
                src="../images/not-found.png"
                alt="Not Found Blog Post"
                placeholder="blurred"
                layout="constrained"
                height={600}
                className="overflow-hidden"
              />
              <Spacer size="sm" />
              <H3 as="p" variant="secondary" className="max-w-lg">
                검색하신 키워드에 해당하는 글이 없어요.
              </H3>
            </div>
          </Grid>
        ) : (
          <>
            <Spacer size="xs" className="col-span-full" />
            <Grid>
              <SSRSuspense
                fallback={
                  <>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton className="col-span-4" key={index}>
                        <Skeleton.Item>
                          <div className="w-full mb-40pxr h-322pxr" data-skeleton-exclude-bg="true">
                            <div className="w-full rounded-lg h-256pxr" />
                            <div className="rounded-lg mt-16pxr h-40pxr" />
                          </div>
                        </Skeleton.Item>
                      </Skeleton>
                    ))}
                  </>
                }
              >
                <AnimatePresence>
                  {posts.map((post) => (
                    <AnimateFadeContainer key={post.slug} className="col-span-4 mb-40pxr">
                      <PostCard post={post} />
                    </AnimateFadeContainer>
                  ))}
                </AnimatePresence>
              </SSRSuspense>
            </Grid>
          </>
        )}
      </ContentSpacer>
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
        timeToRead: { gte: 4 }
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
            date(formatString: "MMMM Do, YYYY")
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
    shortsPostsRemark: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(content|blog)/" }
        frontmatter: { category: { ne: "null" }, tags: { ne: "null" } }
        timeToRead: { lte: 3 }
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
            date(formatString: "MMMM Do, YYYY")
            title
            category
            summary
            tags
          }
        }
      }
      totalCount
    }
  }
`;
