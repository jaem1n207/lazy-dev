import type { GatsbyBrowser } from "gatsby";

import "@fontsource/fira-mono";
import "prismjs/themes/prism-tomorrow.css";

import "./src/common/styles/global.css";

export { wrapPageElement } from "./gatsby-shared";

export const onServiceWorkerUpdateReady: GatsbyBrowser["onServiceWorkerUpdateReady"] = () => {
  const answer = window.confirm(
    "새로운 버전이 있어요. " + "다시 로드하여 새로워진 블로그를 만나보세요",
  );

  if (answer === true) {
    window.location.reload();
  }
};

export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  const showConsole = () => {
    const logStyles = {
      info: [
        "background: #86bff2",
        "background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9)",
        "background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9)",
        "-webkit-background-clip: text",
        "-webkit-text-fill-color: transparent",
        "font-size: 1.75rem",
        "font-weight: bold",
      ].join(";"),
      about: ["font-size: 1.25rem", "font-weight: bold", "color: #86bff2"].join(";"),
    };
    console.log(`
     _                    ____             
    | |    __ _ _____   _|  _ \\  _____   __
    | |   /  \` |_  / | | | | | |/ _ \\ \\ / /
    | |__| (_| |/ /| |_| | |_| |  __/\\ V / 
    |_____\\__,_/___|\\__, |____/ \\___| \\_/  
                    |___/
    `);
    console.log("%cHello! I enjoy expressing what I want in code", logStyles.info);
    console.log("%cAbout me: https://github.com/jaem1n207", logStyles.about);
  };

  showConsole();
};
