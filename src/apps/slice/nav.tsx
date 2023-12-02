import { Link, SliceComponentProps } from 'gatsby';

import ContentSpacer from '@/common/components/layout/content-spacer';
import { ROUTES } from '@/common/const';

import Flexsearch from '../../features/search/flex-search';
import ThemeToggle from '../../features/theme/theme-toggle';

const Nav = ({ sliceContext }: SliceComponentProps<{}, { title: string }>) => {
  return (
    <>
      <ContentSpacer as="nav" className="py-32pxr foldable:py-24pxr">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-bold text-bg-inner">
          {/* <ParticleComponent
              parentElementWidth={280}
              svgClassName="GOOGLE_LOGO"
              animationName="diagonalSlideFromTopParticle"
            /> */}
          <Link
            to={ROUTES.HOME}
            className="focus-primary m-0pxr rounded-sm text-32pxr foldable:text-24pxr"
            aria-label="Blog Home"
          >
            {sliceContext.title}
          </Link>
          <div className="flex items-center gap-16pxr">
            <Link
              to={ROUTES.ABOUT}
              className="focus-primary m-0pxr rounded-sm text-28pxr foldable:text-20pxr"
              aria-label="About"
            >
              About
            </Link>
            <Flexsearch />
            <ThemeToggle />
          </div>
        </div>
      </ContentSpacer>
    </>
  );
};

export default Nav;
