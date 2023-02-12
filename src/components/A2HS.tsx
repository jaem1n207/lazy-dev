import React, { useState } from 'react';

import { StaticImage } from 'gatsby-plugin-image';
import tw from 'twin.macro';

import { useLocalStorage } from 'Hooks/use-local-storage';
import { useSiteMetadata } from 'Hooks/use-site-metadata';
import { Local_STORAGE_KEY } from 'Types/enum';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
};

const useA2HS = () => {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showA2hsBanner, setShowA2hsBanner] = useLocalStorage(Local_STORAGE_KEY.A2HS_BANNER, true);

  const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
    e.preventDefault();
    setPrompt(e);
  };

  const handleInstall = () => {
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then((choiceResult) => {
        handleCancel();
      });
    }
  };

  const handleCancel = () => {
    setShowA2hsBanner(false);
    setPrompt(null);
  };

  return {
    prompt,
    showA2hsBanner,
    handleBeforeInstallPrompt,
    handleInstall,
    handleCancel,
  };
};

const A2HS = () => {
  const { title } = useSiteMetadata();
  const { prompt, handleInstall, handleCancel, showA2hsBanner } = useA2HS();

  return !prompt && showA2hsBanner ? (
    <div className="fixed z-30 flex items-center justify-center w-full bottom-0pxr">
      <div className="p-32pxr rounded-tl-xl rounded-tr-xl bg-a2hs-banner">
        <div className="flex items-center gap-8pxr">
          <StaticImage
            src="../images/favicon.png"
            alt="A2HS Banner"
            placeholder="blurred"
            layout="fixed"
            width={64}
            height={64}
            formats={['auto', 'webp', 'avif']}
            className="flex-grow-0 flex-shrink-0 basis-auto"
          />
          <p className="font-bold grow shrink basis-auto text-button-text text-28pxr foldable:text-24pxr">
            {title} 바로가기를 추가하시겠습니까?
          </p>
        </div>
        <div className="flex items-center mt-28pxr gap-8pxr">
          <button
            css={tw`font-bold grow py-8pxr text-24pxr px-12pxr bg-primary text-button-text foldable:(px-8pxr text-20pxr)`}
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            css={tw`font-bold grow py-8pxr text-24pxr px-12pxr bg-primary text-button-text foldable:(px-8pxr text-20pxr)`}
            onClick={handleInstall}
          >
            홈 화면에 추가하기
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default A2HS;
