import styled from '@emotion/styled';

import typography from './typography';

const Markdown = styled.article<{ rhythm: typeof typography['rhythm'] }>`
  & > * {
    font-family: 'Noto Sans KR', 'Fira Mono', Consolas, Liberation Mono, Menlo, monospace;
    margin-top: 1px;
    margin-bottom: 1px;
    padding: 3px 2px;
  }

  & > *:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):first-of-type {
    margin-top: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    border-bottom: 1px solid var(--color-primary);
    padding-bottom: calc(0.40625rem - 1px);
    color: var(--color-primary);
    font-weight: 700;
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0;
    margin: ${({ rhythm }) => rhythm(1)} 0;
    overflow-wrap: break-word;
  }

  th {
    background-color: var(--color-th-highlight);
    font-weight: 700;
  }

  td,
  th {
    border: 1px solid var(--color-border-highlight);
    font-size: 90%;
    padding: 7px 9px;
  }

  strong {
    font-weight: 700;
  }

  a,
  p {
    font-weight: 400;
  }

  a {
    text-decoration: none;
    color: var(--color-primary) !important;
    * {
      color: var(--color-primary) !important;
    }
    &:hover,
    &:active {
      text-decoration: underline;
    }
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
    margin-bottom: ${({ rhythm }) => rhythm(1.5)};
    margin-top: ${({ rhythm }) => rhythm(3)};

    @media (min-width: 768px) {
      font-size: 1.875rem;
    }
  }

  h3 {
    font-size: 1.1875rem;
    line-height: 1.3;
    margin-bottom: ${({ rhythm }) => rhythm(0.5)};
    margin-top: ${({ rhythm }) => rhythm(1.75)};

    @media (min-width: 768px) {
      font-size: 1.31951rem;
    }
  }

  h4,
  h5,
  h6 {
    margin-bottom: ${({ rhythm }) => rhythm(0.75)};
    margin-top: ${({ rhythm }) => rhythm(1.35)};
  }

  ul,
  ol {
    list-style: initial !important;
    margin-left: ${({ rhythm }) => rhythm(1)};
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
    margin-left: ${({ rhythm }) => rhythm(1)};
  }

  li {
    margin-bottom: ${({ rhythm }) => rhythm(0.3)};
  }

  p,
  li,
  blockquote {
    font-size: 1rem;
    margin-bottom: ${({ rhythm }) => rhythm(0.5)};
  }

  hr {
    margin: 20px 0;
    height: 1px;
    background: var(--color-border-highlight);
  }

  blockquote {
    border-left: 0.25rem solid var(--color-blockquote);
    padding-left: 8px;
    margin: 12px 0;
    * {
      color: var(--color-blockquote);
    }
  }

  img {
    display: block;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    font-family: 'Fira Mono', Consolas, 'Liberation Mono', Menlo, monospace;
    background-color: var(--color-pre-bg) !important;
    color: var(--color-text-primary);
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    font-size: 0.9rem;

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

  pre[class*='language-'] > code[class*='language-'] {
    font-family: 'Fira Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  }

  code[class*='language-'] {
    font-family: 'Noto Sans KR', 'Fira Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  }

  pre {
    border: 1px solid var(--color-pre-border);
    border-radius: 0.6em;
  }

  pre.grvsc-container {
    margin: 24px 0;
  }

  pre[class*='language-'] {
    padding: 1em;

    @media (min-width: 768px) {
      padding: 1.2rem;
    }
  }

  .grvsc-line-highlighted::before {
    background-color: rgba(255, 255, 255, 0.05) !important;
    box-shadow: inset 4px 0 0 0 var(--color-code-highlight-border) !important;
  }

  *:not(pre) > code {
    font-size: 85%;
    padding: 0.2em 0.4em;
    margin: 0 !important;
    border-radius: 3px !important;
    background-image: linear-gradient(
      60deg,
      var(--color-primary) 74.8%,
      var(--color-cyan-50) 99.76%
    ) !important;
    color: transparent !important;
    -webkit-background-clip: text;
    background-clip: text;
    border: 1px solid var(--color-code-highlight-border);
  }

  .token.atrule,
  .token.builtin,
  .token.important,
  .token.keyword,
  .token.selector {
    color: var(--color-token-keyword);
  }

  .token.property,
  .token.class-name,
  .token.constant,
  .token.symbol {
    color: var(--color-token-property);
  }

  .token.boolean,
  .token.number,
  .token.function {
    color: var(--color-token-function);
  }

  .token.punctuation {
    color: var(--color-token-punctuation);
  }

  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex,
  .token.variable {
    color: var(--color-token-string);
  }

  .token.operator,
  .token.entity,
  .token.url {
    color: var(--color-token-operator);
  }
`;

export default Markdown;
