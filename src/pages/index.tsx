import React, { FC, useEffect } from 'react';

import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';

import PostList from 'Apps/post/components/post-list';
import ShortList from 'Apps/post/components/short-list';
import TagList from 'Apps/tag/components/tag-list';
import Seo from 'Components/seo';

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

// const FeaturedPostTitle = 'JavaScript에서 내장 객체를 확장하는 것이 위험한 이유';

const IndexPage: FC<PageProps<Queries.HomeQuery>> = ({ data, location }) => {
  // const [currentCategory, setCurrentCategory] = useState<string | undefined>();
  // const { category, selectCategory, resetCategory } = useCategory();

  // const searchInputRef = useRef<HTMLInputElement>(null);

  // const isCategoryAll = useMemo(() => {
  //   return category === CATEGORY_TYPE.ALL;
  // }, [category]);

  // const heroPost = useMemo(() => {
  //   const heroPost = data.posts.edges.find(
  //     (edge) => edge.node.frontmatter?.title === FeaturedPostTitle
  //   );
  //   if (!heroPost) return undefined;

  //   const { slug } = heroPost.node.fields!;
  //   const { title, date, category, summary, thumbnail } = heroPost.node.frontmatter!;
  //   const { childImageSharp } = thumbnail!;
  //   const post: Post = {
  //     slug,
  //     title,
  //     date,
  //     category,
  //     summary,
  //     thumbnail: childImageSharp?.id!,
  //     timeToRead: heroPost.node.timeToRead,
  //     tags: heroPost.node.frontmatter?.tags!,
  //   };

  //   return post;
  // }, [data.postsRemark.edges]);

  // const categories = useMemo(() => data.categoriesGroup.group, [data.categoriesGroup.group]);

  // useEffect(() => {
  //   if (category) {
  //     setCurrentCategory(category);
  //   } else {
  //     setCurrentCategory(undefined);
  //   }
  // }, [category]);

  // const postData = data.postsRemark.edges;

  // const refinedPosts = useMemo(() => {
  //   const filteredPosts = postData
  //     .filter((post) => {
  //       if (currentCategory === CATEGORY_TYPE.ALL) {
  //         return true;
  //       } else {
  //         return post.node.frontmatter?.category === currentCategory;
  //       }
  //     })
  //     .map((edge) => {
  //       const { slug } = edge.node.fields!;
  //       const { title, date, category, summary, thumbnail, tags } = edge.node.frontmatter!;
  //       const { childImageSharp } = thumbnail!;
  //       const post: Post = {
  //         slug,
  //         title,
  //         date,
  //         category,
  //         summary,
  //         thumbnail: childImageSharp?.id!,
  //         timeToRead: edge.node.timeToRead,
  //         tags,
  //       };

  //       return post;
  //     });

  //   return filteredPosts;
  // }, [currentCategory, postData]);

  // const tagsSet = new Set(refinedPosts.flatMap((post) => post.tags).filter(Boolean));
  // const tagsArray = Array.from(tagsSet);

  // const [queryValue, setQueryValue] = useState<string>(() => {
  //   return (queryString.parse(location.search)[QUERY_PARAM.KEYWORDS] as string) ?? '';
  // });
  // const query = queryValue.trim();
  // useUpdateQueryStringValueWithoutNavigation(QUERY_PARAM.KEYWORDS, query);

  // const toggleTag = (tag: string) => {
  //   setQueryValue((prevQuery) => {
  //     const expression = new RegExp(tag, 'ig');

  //     const newQuery = expression.test(prevQuery)
  //       ? prevQuery.replace(expression, '')
  //       : `${prevQuery} ${tag}`;

  //     return newQuery.replace(/\s+/g, ' ').trim();
  //   });
  // };

  // const isSearching = query.length > 0;

  // const searchResults = useMemo(() => {
  //   if (isSearching) {
  //     return filterPosts(refinedPosts, query);
  //   } else {
  //     return [];
  //   }
  // }, [isSearching, query, refinedPosts]);

  // const visibleTags = isSearching
  //   ? new Set(searchResults.flatMap((post) => post.tags).filter(Boolean))
  //   : new Set(tagsArray);

  // const posts = isSearching ? searchResults : refinedPosts;

  // const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   // 입력한 값이 태그와 일치함을 검사하기 위해 소문자로 변환
  //   setQueryValue(value.toLowerCase());
  // };

  // const handleClearSearch = () => {
  //   setQueryValue('');
  //   searchInputRef.current?.focus();
  // };

  // const resultsRef = useRef<HTMLOListElement>(null);
  // const handleScrollToResults = (event: KeyboardEvent<HTMLElement>) => {
  //   if (event.key === 'Enter') {
  //     if (resultsRef.current) {
  //       resultsRef.current.querySelector('a')?.focus({ preventScroll: true });
  //       resultsRef.current.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }
  // };

  // const handleSelectCategory = (category: string) => {
  //   selectCategory(category);
  //   setQueryValue('');
  // };
  // const handleResetCategory = () => {
  //   resetCategory();
  //   setQueryValue('');
  // };

  // const searchLabelBaseClasses =
  //   'absolute top-0pxr left-0pxr w-full h-full flex items-center duration-200 pl-40pxr';
  // const searchLabelFocusedClasses = classNames(
  //   {
  //     'group-focus-within:text-18pxr foldable:group-focus-within:text-16pxr mobile:group-focus-within:text-12pxr group-focus-within:h-5/6 group-focus-within:-translate-y-full group-focus-within:pl-0pxr':
  //       isEmptyString(queryValue),
  //   },
  //   {
  //     'h-5/6 -translate-y-full group-focus-within:pl-0pxr pl-0pxr text-18pxr foldable:text-16pxr mobile:text-14pxr':
  //       !isEmptyString(queryValue),
  //   }
  // );
  // const searchLabelClasses = classNames(searchLabelBaseClasses, searchLabelFocusedClasses);

  const tags = data.tags.group;
  const posts = data.posts.edges;
  const shorts = data.shorts.edges;

  return (
    <main>
      <div className="grid relative mx-auto max-w-[1500px] grid-cols-main-three-large desktop:grid-cols-main-three-small tablet:grid-cols-main-two foldable:flex foldable:flex-col foldable:items-center">
        <TagList tags={tags} />
        <PostList posts={posts} />
        <ShortList shorts={shorts} />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = ({ location }: HeadProps) => (
  <Seo title="Lazy Dev" pathname={location.pathname} />
);

export const pageQuery = graphql`
  query Home {
    tags: allMarkdownRemark(sort: { frontmatter: { tags: ASC } }) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(content|blog)/" }, timeToRead: { gte: 4 } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            summary
            thumbnail {
              childImageSharp {
                gatsbyImageData(height: 300, placeholder: BLURRED)
              }
            }
            date(formatString: "YYYY.MM.DD")
            tags
          }
        }
      }
    }
    shorts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(content|blog)/" }, timeToRead: { lte: 3 } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            thumbnail {
              childImageSharp {
                gatsbyImageData(height: 150, placeholder: BLURRED)
              }
            }
            date(formatString: "YYYY.MM.DD")
          }
        }
      }
    }
  }
`;
