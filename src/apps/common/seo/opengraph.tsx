import { Meta, MetaFilter, MultiMeta } from './Meta';
import type { Metadata } from './meta-interface';

interface OpenGraphMetadataProps {
  openGraph: Metadata['openGraph'];
}

const OpenGraphMetadata = ({ openGraph }: OpenGraphMetadataProps) => {
  if (!openGraph) return null;

  let typedOpenGraph;
  if ('type' in openGraph) {
    const openGraphType = openGraph.type;
    switch (openGraphType) {
      case 'website':
        typedOpenGraph = [
          Meta({
            property: 'og:type',
            content: 'website',
          }),
        ];
        break;
      case 'article':
        typedOpenGraph = [
          Meta({ property: 'og:type', content: 'article' }),
          Meta({
            property: 'article:published_time',
            content: openGraph.publishedTime?.toString(),
          }),
          Meta({
            property: 'article:modified_time',
            content: openGraph.modifiedTime?.toString(),
          }),
          Meta({
            property: 'article:expiration_time',
            content: openGraph.expirationTime?.toString(),
          }),
          MultiMeta({
            propertyPrefix: 'article:author',
            contents: openGraph.authors,
          }),
          Meta({ property: 'article:section', content: openGraph.section }),
          MultiMeta({
            propertyPrefix: 'article:tag',
            contents: openGraph.tags,
          }),
        ];
        break;

      default:
        // eslint-disable-next-line no-case-declarations
        const _exhaustiveCheck: never = openGraphType;
        throw new Error(`Unhandled OpenGraph type: ${_exhaustiveCheck}`);
    }
  }

  return MetaFilter([
    Meta({ property: 'og:title', content: openGraph.title }),
    Meta({ property: 'og:description', content: openGraph.description }),
    Meta({ property: 'og:determiner', content: openGraph.determiner }),
    Meta({ property: 'og:description', content: openGraph.description }),
    Meta({ property: 'og:url', content: openGraph.url?.toString() }),
    Meta({ property: 'og:site_name', content: openGraph.siteName }),
    Meta({ property: 'og:locale', content: openGraph.locale }),
    Meta({ property: 'og:country_name', content: openGraph.countryName }),
    Meta({ property: 'og:ttl', content: openGraph.ttl?.toString() }),
    MultiMeta({ propertyPrefix: 'og:image', contents: openGraph.image }),
    MultiMeta({ propertyPrefix: 'og:email', contents: openGraph.emails }),
    MultiMeta({
      propertyPrefix: 'og:phone_number',
      contents: openGraph.phoneNumbers,
    }),
    MultiMeta({
      propertyPrefix: 'og:fax_number',
      contents: openGraph.faxNumbers,
    }),
    MultiMeta({
      propertyPrefix: 'og:locale:alternate',
      contents: openGraph.alternateLocale,
    }),
    ...(typedOpenGraph ? typedOpenGraph : []),
  ]);
};

export default OpenGraphMetadata;
