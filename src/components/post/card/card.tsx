import React from 'react';

import { Link } from 'gatsby';
import tw from 'twin.macro';

import { firstLetterUppercase } from 'Libs/string';
import Post from 'Types/post';

import CenteredImage from './centered-image';

interface CardProps extends Post {}

const Card = ({ slug, title, summary, date, category, thumbnail, timeToRead }: CardProps) => {
  const blogLink = slug || '';

  return (
    <li>
      <article
        css={tw`relative flex flex-col justify-between rounded-lg border-article-border bg-article-background aspect-video p-48pxr border-1pxr tablet:p-36pxr foldable:p-24pxr`}
      >
        <CenteredImage thumbnail={thumbnail} />
        <header css={tw`z-10`}>
          <h2
            css={tw`font-bold leading-snug text-32pxr text-primary tablet:text-28pxr foldable:text-24pxr`}
          >
            <Link
              to={blogLink}
              itemProp="url"
              css={tw`transition-shadow hover:shadow-text-underline focus:shadow-text-underline`}
            >
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
          <p
            css={tw`max-w-lg pt-12pxr text-16pxr foldable:text-14pxr`}
            dangerouslySetInnerHTML={{
              __html: summary!,
            }}
            itemProp="description"
          />
        </header>
        <section
          css={tw`flex items-center flex-row  relative z-10 w-full justify-between foldable:(flex-col items-start pt-24pxr)`}
        >
          <div
            css={tw`text-gray-900 text-16pxr leading-6 opacity-90 flex items-center gap-32pxr foldable:(text-14pxr leading-5 mb-12pxr) dark:text-white`}
          >
            <div>
              <div css={tw`block font-bold mb-4pxr`}>Date</div>
              <time dateTime={date!}>{date}</time>
            </div>
            <div>
              <div css={tw`block font-bold mb-4pxr`}>Time to read</div>~{timeToRead} miniutes
            </div>
            <div>
              <div css={tw`block font-bold mb-4pxr`}>Category</div>
              {firstLetterUppercase(category!)}
            </div>
          </div>
          <Link
            to={blogLink}
            itemProp="url"
            className="group/link"
            css={tw`font-bold transition-colors rounded-md py-12pxr px-16pxr bg-primary text-button-text flex items-center gap-4pxr foldable:(py-8pxr px-12pxr text-12pxr)`}
          >
            포스팅 보러가기
            <div
              aria-hidden="true"
              className="transition-transform group-hover/link:translate-x-4pxr"
            >
              →
            </div>
          </Link>
        </section>
      </article>
    </li>
  );
};

export default Card;
