/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HighlightMatches from '../highlight-matches';

describe('HighlightMatches', () => {
  test('검색어가 비어있을 때, 아무것도 반환하지 않아야 합니다', () => {
    const { container } = render(<HighlightMatches match="" value="" />);
    expect(container).toBeEmptyDOMElement();
  });

  test('검색어와 일치하는 부분이 없을 때, 원본 텍스트를 그대로 반환해야 합니다', () => {
    const { getByText } = render(<HighlightMatches match="nonexistent" value="Some text" />);
    expect(getByText('Some text')).toBeInTheDocument();
  });

  test('검색어와 일치하는 부분을 하이라이트해야 합니다', () => {
    const { container } = render(<HighlightMatches match="some" value="Some text" />);
    expect(container.innerHTML).toContain('<span class="text-primary">Some</span>');
  });

  test('공백을 포함한 검색어에 대해 올바르게 작동해야 합니다', () => {
    const { container } = render(<HighlightMatches match="some text" value="Some text" />);
    expect(container.innerHTML).toContain(
      '<span class="text-primary">Some</span> <span class="text-primary">text</span>',
    );
  });

  test('공백만 있는 검색어에 대해 무한 루프에 빠지지 않아야 합니다', () => {
    const { container } = render(<HighlightMatches match="  " value="Some text" />);
    expect(container).toHaveTextContent('Some text');
  });

  test('공백이 여러 개 있는 검색어에 대해 올바르게 작동해야 합니다', () => {
    const { container } = render(<HighlightMatches match="Some  text" value="Some text" />);
    expect(container.innerHTML).toContain(
      '<span class="text-primary">Some</span> <span class="text-primary">text</span>',
    );
  });

  test('공백과 함께 다른 문자가 있는 검색어에 대해 올바르게 작동해야 합니다', () => {
    const { container } = render(<HighlightMatches match="So  e" value="Some text" />);
    expect(container.innerHTML).toContain(
      '<span class="text-primary">So</span>m<span class="text-primary">e</span> t<span class="text-primary">e</span>xt',
    );
  });
});
