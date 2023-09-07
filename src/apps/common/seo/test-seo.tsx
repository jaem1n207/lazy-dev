import * as React from 'react';

import { createDefaultMetadata } from './generate/default-metadata';
import { MetaFilter } from './Meta';
import type { Metadata } from './meta-interface';
import OpenGraphMetadata from './opengraph';

// type SeoProps = {
//   title?: string | null;
//   description?: string | null;
//   thumbnail?: string | null;
//   pathname?: string;
//   openGraph?: OpenGraph | null;
//   twitter?: Twitter | null;
//   children?: React.ReactNode;
// } & Pick<Queries.SiteSiteMetadata, 'title'>;

type Twitter =
  | TwitterSummary
  | TwitterSummaryLargeImage
  | TwitterPlayer
  | TwitterApp
  | TwitterMetadata;

type TwitterMetadata = {
  site?: string;
  siteId?: string;
  creator?: string;
  creatorId?: string;
  description?: string;
  title?: string;
  images?: string;
};
type TwitterSummary = TwitterMetadata & {
  card: 'summary';
};
type TwitterSummaryLargeImage = TwitterMetadata & {
  card: 'summary_large_image';
};
type TwitterPlayer = TwitterMetadata & {
  card: 'player';
  players: TwitterPlayerDescriptor | Array<TwitterPlayerDescriptor>;
};
type TwitterApp = TwitterMetadata & {
  card: 'app';
  app: TwitterAppDescriptor;
};

type TwitterAppDescriptor = {
  id: {
    iphone?: string | number;
    ipad?: string | number;
    googleplay?: string;
  };
  url?: {
    iphone?: string | URL;
    ipad?: string | URL;
    googleplay?: string | URL;
  };
  name?: string;
};

type TwitterPlayerDescriptor = {
  playerUrl: string | URL;
  streamUrl: string | URL;
  width: number;
  height: number;
};

const CommonMetadata = () => {
  const defaultMetadata = createDefaultMetadata();
  let metadata: Metadata | undefined = defaultMetadata;

  // const elements = React.Children.toArray(children);
  const elements = MetaFilter([
    OpenGraphMetadata({
      openGraph: metadata.openGraph,
    }),
  ]);

  return (
    <>
      {elements.map((el, index) => {
        // @ts-ignore
        return React.cloneElement(el as React.ReactElement, {
          key: index,
        });
      })}
    </>
  );
};

const SEOWrapper = ({
  children,
  metadata,
}: {
  children?: React.ReactNode;
  metadata?: Metadata;
}) => {
  const elements = MetaFilter([
    OpenGraphMetadata({
      openGraph: metadata?.openGraph,
    }),
  ]);

  return (
    <>
      {metadata ? (
        <>
          {elements.map((el, index) => {
            // @ts-ignore
            return React.cloneElement(el as React.ReactElement, {
              key: index,
            });
          })}
        </>
      ) : (
        <CommonMetadata />
      )}
      {children}
    </>
  );
};

export default SEOWrapper;
