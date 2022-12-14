export default interface Post
  extends Pick<
    Queries.MarkdownRemarkFrontmatter,
    'title' | 'category' | 'description' | 'date' | 'draft' | 'thumbnail'
  > {
  slug: Queries.MarkdownRemarkFields['slug'];
}
