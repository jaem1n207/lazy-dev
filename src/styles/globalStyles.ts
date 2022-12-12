import { css } from '@emotion/react';
import tw, { theme } from 'twin.macro';

const customStyles = css({
  body: {
    backgroundColor: theme`colors.white`,
    color: theme`colors.dark`,
    minHeight: '100vh',
    transitionProperty: 'background-color, color',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-in-out',
    ...tw`antialiased`,
  },
  'html.dark body': {
    backgroundColor: theme`colors.dark`,
    color: theme`colors.white`,
  },
  header: {
    fontFamily: 'Spoqa Han Sans Neo',
  },
});

export default customStyles;
