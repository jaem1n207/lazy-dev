import { useEffect } from 'react';

import { motion } from 'framer-motion';
import { graphql, HeadProps, Link, PageProps, Slice } from 'gatsby';

import { SeedingIcon } from 'Apps/common/icon/seeding-icon';
import { TagIcon } from 'Apps/common/icon/tag-icon';
import { ContentSpacer, Grid, Spacer } from 'Apps/common/layout';
import Seo from 'Apps/common/seo/seo';
import { H1, H2 } from 'Apps/common/typography';
import { ROUTES } from 'Types/enum';
import { animateVariant, textVariant } from 'Utils/motion';
import * as ScrollManager from 'Utils/scroll';

import PostCard from '../components/post-card';
import TableOfContents from '../components/table-of-contents';

import '../styles/markdown.css';

const BlogPost = ({ data }: PageProps<Queries.BlogPostBySlugQuery>) => {
  const { frontmatter, html, timeToRead, tableOfContents } = data.post!;
  const relatedPosts = data.relatedPosts.edges;
  const { title, date, category, summary } = frontmatter!;

  useEffect(() => {
    ScrollManager.init();

    return () => {
      ScrollManager.destroy();
    };
  }, []);

  return (
    <ContentSpacer className="foldable:mx-16pxr">
      <Grid>
        <div className="col-span-4 col-start-12 desktop:visually-hide">
          <TableOfContents toc={tableOfContents} />
        </div>

        <div className="col-span-8 col-start-3 desktop:col-span-full desktop:col-start-1">
          <header className="mb-64pxr tablet:mb-48pxr">
            <H1 className="font-bold">{title}</H1>
            <div className="mt-8pxr flex items-center gap-8pxr text-16pxr font-bold text-all-custom-gray">
              <time dateTime={date!}>{date}</time>
              <span className="h-16pxr w-1pxr bg-all-custom-gray" />
              <span>{category}</span>
              <span className="h-16pxr w-1pxr bg-all-custom-gray" />
              <span>{timeToRead} min read</span>
            </div>
            <div className="mt-8pxr flex items-center gap-8pxr text-all-custom-gray">
              <TagIcon className="h-18pxr w-18pxr" />
              {frontmatter?.tags?.map((tag) => (
                <Link
                  key={tag}
                  to={ROUTES.TAG.toUrl(tag!)}
                  className="rounded-full border-2pxr border-all-custom-gray px-6pxr py-3pxr text-14pxr font-bold"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* <div className="to-gradient-cyan relative mb-32pxr mt-56pxr h-1pxr w-full bg-gradient-to-r from-primary box-decoration-slice">
              <div className="absolute -top-24pxr left-[calc(50%-2.25rem)] mx-12pxr flex justify-center bg-bg-primary">
                <SeedingIcon className="h-48pxr w-48pxr bg-bg-primary fill-primary transition" />
              </div>
            </div> */}
            <div className="mt-48pxr inline-grid w-full grid-cols-[2fr_auto_2fr] items-center gap-12pxr">
              <hr className="border-t-[0.03125rem] border-primary" />
              <SeedingIcon className="h-48pxr w-48pxr fill-primary stroke-neutral-700 dark:stroke-white" />
              <hr className="border-t-[0.03125rem] border-primary" />
            </div>
            <p className="text-16pxr font-semibold tablet:text-14pxr">{summary}</p>
            <hr className="my-24pxr border-t-[0.03125rem] border-primary tablet:my-16pxr" />
          </header>

          <article
            className="prose max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: html! }}
          />

          <Spacer size="xl" />

          <div className="mb-64pxr flex flex-col tablet:mb-48pxr">
            <H2 className="mb-32pxr font-bold tablet:mb-28pxr foldable:mb-24pxr">연관 콘텐츠</H2>
            <motion.div
              initial={animateVariant.hidden}
              whileInView={animateVariant.show}
              variants={textVariant()}
              viewport={{ once: true }}
            >
              {relatedPosts?.length === 0 ? (
                <div className="flex h-200pxr w-full flex-col items-center justify-center rounded-lg bg-bg-secondary">
                  <p className="text-20pxr font-bold text-text-primary foldable:text-18pxr">
                    연관된 콘텐츠가 없어요.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-24pxr tablet:grid-cols-1">
                  {relatedPosts?.map((post) => (
                    <PostCard key={post.node.fields?.slug} post={post} />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <Spacer size="sm" />

          <Slice alias="bio" />
        </div>
      </Grid>
    </ContentSpacer>
  );
};

export const Head = ({ data: { post }, location }: HeadProps<Queries.BlogPostBySlugQuery>) => {
  return (
    <Seo
      title={`${post?.frontmatter?.title} | Lazy Dev`}
      description={post?.frontmatter?.summary}
      openGraph={{
        type: 'article',
        url: location.pathname,
        image: post?.frontmatter?.thumbnail?.childImageSharp?.fixed?.src,
      }}
    />
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!, $tags: [String]!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      tableOfContents
      frontmatter {
        category
        title
        summary
        date(formatString: "YYYY.MM.DD")
        tags
        thumbnail {
          childImageSharp {
            fixed(width: 800) {
              src
            }
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(content|blog)/" }
        frontmatter: { tags: { in: $tags } }
        fields: { slug: { ne: $slug } }
      }
      sort: { frontmatter: { date: DESC } }
      limit: 4
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            tags
            date(formatString: "YYYY.MM.DD")
            summary
            thumbnail {
              childImageSharp {
                gatsbyImageData(height: 300, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`;

export default BlogPost;
