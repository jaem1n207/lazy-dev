export default interface Post
  extends Pick<
    Queries.MarkdownRemarkFrontmatter,
    'title' | 'category' | 'description' | 'date' | 'draft'
  > {
  slug: Queries.MarkdownRemarkFields['slug'];
}
