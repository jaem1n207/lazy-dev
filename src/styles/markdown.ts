import styled from '@emotion/styled';

import typography from './typography';

const Markdown = styled.article<{ rhythm: typeof typography['rhythm'] }>`
  ul,
  li,
  th,
  td,
  tr,
  blockquote,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: Fira Mono, Consolas, Liberation Mono, Menlo, monospace;
    font-weight: 700;
    letter-spacing: -0.1px;
  }

  td,
  th {
    border-bottom: 1px solid #3a3a3a;
    font-size: 90%;
  }

  strong {
    font-weight: 500;
  }

  a,
  p {
    font-weight: 400;
    font-family: Spoqa Han Sans Neo, Fira Mono, Consolas;
  }

  a {
    text-decoration: none;
    color: #0687f0 !important;
    * {
      color: #0687f0 !important;
    }
    &:hover,
    &:active {
      text-decoration: underline;
    }
  }

  & > *:first-of-type {
    margin-top: 0;
  }

  h1 {
    font-size: 2rem;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 1.3125rem;
    line-height: 1.3;
    margin-bottom: ${({ rhythm }) => rhythm(1)};
    margin-top: ${({ rhythm }) => rhythm(2.25)};

    @media (min-width: 768px) {
      font-size: 1.75rem;
    }
  }

  h3 {
    font-size: 1.1875rem;
    line-height: 1.3;
    margin-bottom: ${({ rhythm }) => rhythm(1)};
    margin-top: ${({ rhythm }) => rhythm(1.5)};

    @media (min-width: 768px) {
      font-size: 1.31951rem;
    }
  }

  h4,
  h5,
  h6 {
    margin-bottom: ${({ rhythm }) => rhythm(0.5)};
    margin-top: ${({ rhythm }) => rhythm(1)};
  }

  ul,
  ol {
    list-style: initial !important;
    margin-top: ${({ rhythm }) => rhythm(1)};
    margin-bottom: ${({ rhythm }) => rhythm(1)};
    margin-left: ${({ rhythm }) => rhythm(1.25)};
  }

  li > ul,
  li > ol {
    margin-top: 0;
    margin-bottom: 0;
  }

  li > p {
    margin-bottom: 0;
  }

  li > ol,
  li > ul {
    margin-left: ${({ rhythm }) => rhythm(1.25)};
  }

  li {
    margin-bottom: ${({ rhythm }) => rhythm(0.3)};
  }

  p,
  li,
  blockquote {
    font-size: 1rem;
  }

  p {
    line-height: 1.68;
    text-align: left;
    margin-bottom: 24px;
  }

  hr {
    margin: 40px 0;
    background: #3a3a3a;
  }

  blockquote {
    border-left: 0.25rem solid #2c2c2c;
    padding-left: 16px;
    margin: 24px 0;
    * {
      color: #999;
    }
  }

  img {
    display: block;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    font-family: Fira Mono, Consolas, Liberation Mono, Menlo, monospace;
    background-color: #242323;
    color: #e0e0e0;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.6;
    font-size: 1rem;

    -moz-tab-size: 2;
    -o-tab-size: 2;
    tab-size: 2;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;

    -ms-overflow-style: none; // IE 10+
    overflow: -moz-scrollbars-none; // Firefox
  }

  pre {
    border: none;
    border-radius: 0.6em;
  }

  pre.grvsc-container {
    margin: 24px 0;
  }

  .grvsc-line-highlighted::before {
    background-color: rgba(255, 255, 255, 0.05) !important;
    box-shadow: inset 4px 0 0 0 rgba(255, 255, 255, 0.2) !important;
  }

  *:not(pre) > code {
    background-color: #3a3a3a;
    padding: 0.2rem 0.4rem;
    margin: 0;
    font-size: 85%;
    border-radius: 3px;
  }
`;

export default Markdown;
