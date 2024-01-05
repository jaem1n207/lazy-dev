import { Slice } from "gatsby";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Slice alias='nav' />
      {children}
      <Slice alias='footer' />
    </>
  );
};

export default Layout;
