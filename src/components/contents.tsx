// import * as React from 'react';

// import { Link } from 'gatsby';

// interface Props {
//   posts: {
//     edges: {
//       node: {
//         excerpt: string;
//         fields: {
//           slug: string;
//         };
//         frontmatter: {
//           date: string;
//           title: string;
//           category: string;
//         };
//       };
//     }[];
//   };
// }

// const Contents: React.FC<Props> = ({ posts }) => {
//   return (
//     <div>
//       {posts.edges.map(({ node }) => {
//         const title = node.frontmatter.title || node.fields.slug;

//         return (
//           <Link to={node.fields.slug} key={node.fields.slug}>
//             <article key={node.fields.slug}>
//               <header>
//                 <h3>{title}</h3>
//                 <small>{node.frontmatter.date}</small>
//               </header>
//               <section>
//                 <p>{node.frontmatter.category}</p>
//                 <p
//                   dangerouslySetInnerHTML={{
//                     __html: node.excerpt,
//                   }}
//                 />
//               </section>
//             </article>
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default Contents;
