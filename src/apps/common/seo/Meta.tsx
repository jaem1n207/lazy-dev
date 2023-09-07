import * as React from 'react';

import { isNil } from 'Utils/assertions';

import type { ExtendMetaContent, MultiMetaContent } from './meta-types';

type MultiMetaProps = {
  propertyPrefix?: string;
  namePrefix?: string;
  contents?: MultiMetaContent | null;
};

const getMetaKey = (prefix: string, key: string) => {
  // Use `twitter:image` and `og:image` instead of `twitter:image:url` and `og:image:url`
  // to be more compatible as it's a more common format
  if ((prefix === 'og:image' || prefix === 'twitter:image') && key === 'url') {
    return prefix;
  }
  if (prefix.startsWith('og:') || prefix.startsWith('twitter:')) {
    key = camelToSnake(key);
  }
  return prefix + ':' + key;
};

const camelToSnake = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const MetaFilter = <T extends {} | {}[]>(items: (T | null)[]): NonNullable<T>[] => {
  return items.filter((item): item is NonNullable<T> => !isNil(item)) as NonNullable<T>[];
};

type ExtendMetaProps = {
  content?: ExtendMetaContent;
  namePrefix?: string;
  propertyPrefix?: string;
};

const ExtendMeta = ({ content, namePrefix, propertyPrefix }: ExtendMetaProps) => {
  if (!content) return null;

  return (
    <>
      {Object.entries(content).map(([key, value]) => {
        return typeof value === 'undefined'
          ? null
          : Meta({
              ...(propertyPrefix && {
                property: getMetaKey(propertyPrefix, key),
              }),
              ...(namePrefix && {
                name: getMetaKey(namePrefix, key),
              }),
              content: typeof value === 'string' ? value : value?.toString(),
            });
      })}
    </>
  );
};

type MetaProps = {
  name?: string;
  property?: string;
  media?: string;
  content: string | URL | number | null | undefined;
};

export const Meta = ({ name, property, media, content }: MetaProps): React.ReactElement | null => {
  if (typeof content !== 'undefined' && content !== 'null' && content !== '') {
    return (
      <meta
        {...(name ? { name } : { property })}
        {...(media ? { media } : undefined)}
        content={typeof content === 'string' ? content : content?.toString()}
      />
    );
  }

  return null;
};

export const MultiMeta = ({
  propertyPrefix,
  namePrefix,
  contents,
}: MultiMetaProps): any[] | null => {
  if (typeof contents === 'undefined' || contents === null) {
    return null;
  }

  if (typeof contents === 'string') {
    return MetaFilter([
      Meta({
        ...(propertyPrefix ? { property: propertyPrefix } : { name: namePrefix }),
        content: contents,
      }),
    ]);
  }

  return MetaFilter(
    contents.map((content) => {
      if (typeof content === 'string' || typeof content === 'number' || content instanceof URL) {
        return Meta({
          ...(propertyPrefix ? { property: propertyPrefix } : { name: namePrefix }),
          content,
        });
      } else {
        return ExtendMeta({
          namePrefix,
          propertyPrefix,
          content,
        });
      }
    }),
  );
};
