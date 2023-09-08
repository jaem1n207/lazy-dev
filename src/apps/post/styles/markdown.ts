import styled from '@emotion/styled';

import typography from './typography';

const Markdown = styled.article<{ rhythm: (typeof typography)['rhythm'] }>`
  & > * {
    margin-top: 1px;
    margin-bottom: 1px;
    padding: 3px 2px;
    line-height: calc(1rem + 0.725rem);
  }

  & > *:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):first-of-type {
    margin-top: 0;
  }

  *:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) strong {
    box-shadow: inset 0 -0.2em 0 var(--color-primary);
    color: var(--color-text-white);
    font-weight: 600;
    padding-bottom: 0.2em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--color-bg-inner);
    font-weight: 600;
    overflow-wrap: break-word;
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
    font-weight: 600;
  }

  td,
  th {
    border: 1px solid var(--color-border-highlight);
    font-size: 0.9rem;
    padding: 7px 9px;
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
    font-size: 1.75rem;
    margin-top: ${({ rhythm }) => rhythm(2.6)};
    margin-bottom: ${({ rhythm }) => rhythm(1.4)};

    @media (min-width: 768px) {
      font-size: 1.875rem;
    }
  }

  h3 {
    font-size: 1.5rem;
    margin-top: ${({ rhythm }) => rhythm(1.9)};
    margin-bottom: ${({ rhythm }) => rhythm(0.175)};
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
    margin-left: ${({ rhythm }) => rhythm(1)};
  }

  li > p {
    margin-top: 4px;
    margin-bottom: 0;
  }

  li {
    margin-bottom: ${({ rhythm }) => rhythm(0.3)};
  }

  li,
  blockquote {
    font-size: 1rem;
    margin-bottom: ${({ rhythm }) => rhythm(0.5)};
    color: var(--color-paragraph-text);
  }

  blockquote > p:first-of-type {
    margin: 0;
  }

  p {
    font-size: 1.05rem;
    color: var(--color-paragraph-text);
    letter-spacing: -0.003em;
    margin: 1.25rem 0px 8px;
    overflow-wrap: break-word;
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
    font-size: 0.9rem;
    color: var(--color-text-primary);
    background-color: var(--color-pre-bg);
    text-align: left;
    white-space: pre-wrap;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    overflow-x: auto;

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
    font-size: 0.85rem !important;
    padding: 0.2em 0.4em;
    margin: 0 !important;
    border-radius: 3px !important;
    background-color: var(--color-code-highlight-bg) !important;
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
