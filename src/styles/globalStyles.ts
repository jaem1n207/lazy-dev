import { css } from '@emotion/react';
import tw, { theme } from 'twin.macro';

const customStyles = css({
  'html, body': {
    backgroundColor: theme`colors.gray.100`,
    ...tw`antialiased`,
  },
});

export default customStyles;
