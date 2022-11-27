import * as React from 'react';

import { Global } from '@emotion/react';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

import SEO from 'Components/seo';
import customStyles from 'Styles/globalStyles';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div css={tw``}>
      <BaseStyles />
      <Global styles={customStyles} />
      <SEO />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
