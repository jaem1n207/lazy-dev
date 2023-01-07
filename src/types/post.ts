export default interface Post
  extends Pick<Queries.MarkdownRemarkFrontmatter, 'date' | 'title' | 'category' | 'summary'> {
  thumbnail: string;
  slug: Queries.MarkdownRemarkFields['slug'];
  timeToRead: Queries.MarkdownRemark['timeToRead'];
}
