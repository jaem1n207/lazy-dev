import type { IGatsbyImageData } from 'gatsby-plugin-image';

export default interface Post
  extends Pick<Queries.MarkdownRemarkFrontmatter, 'date' | 'title' | 'summary' | 'tags'> {
  thumbnail: IGatsbyImageData;
  slug: Queries.MarkdownRemarkFields['slug'];
  timeToRead: Queries.MarkdownRemark['timeToRead'];
}
