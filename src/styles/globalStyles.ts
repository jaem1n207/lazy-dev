import { css } from '@emotion/react';
import tw, { theme } from 'twin.macro';

const customStyles = css({
  'html, body': {
    backgroundColor: theme`colors.dark`,
    color: theme`colors.white`,
    ...tw`antialiased`,
  },
});

export default customStyles;
