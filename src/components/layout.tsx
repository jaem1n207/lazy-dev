import * as React from 'react';

import { Global } from '@emotion/react';
import { GlobalStyles as BaseStyles } from 'twin.macro';

import SEO from 'Components/seo';
import customStyles from 'Styles/globalStyles';

const Layout = () => {
  return (
    <div>
      <BaseStyles />
      <Global styles={customStyles} />
      Layout <SEO />
    </div>
  );
};

export default Layout;
