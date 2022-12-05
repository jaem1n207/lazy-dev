import React from 'react';

const Footer = () => {
  return (
    <footer>
      @ {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://github.com/jaem1n207/lazy-dev">Lazy Dev</a>
    </footer>
  );
};

export default Footer;
