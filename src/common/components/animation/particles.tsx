import { memo } from "react";

import ClientOnly from "../wrapper/client-only";
import { DiagonalSlideFromTopParticle, RandomNumberGenerator } from "./particle-style-builder";

const particleAnimations = {
  diagonalSlideFromTopParticle: DiagonalSlideFromTopParticle,
};

export const SVG_CLASSES = {
  GOOGLE_LOGO: "google-logo",
  MUISIC: "music",
};

interface ParticleProps {
  /**
   * @default 50
   * @description 부모 요소의 너비를 기준으로 파티클의 개수를 결정합니다.
   */
  parentElementWidth?: number;
  /**
   * @description svg 클래스 이름을 지정합니다.
   */
  svgClassName: keyof typeof SVG_CLASSES;
  /**
   * @description 사용할 파티클 애니메이션 이름을 지정합니다.
   */
  animationName: keyof typeof particleAnimations;
}

const ParticleComponent = ({
  parentElementWidth = 50,
  svgClassName,
  animationName,
}: ParticleProps) => {
  const particleLength = Math.round(parentElementWidth / 50) * 10;

  return (
    <ClientOnly>
      <span className='particle-container'>
        {Array.from({ length: particleLength }).map((_, index) => {
          const rng = new RandomNumberGenerator();
          const ParticleAnimation = particleAnimations[animationName];
          const particleAnimation = new ParticleAnimation(rng);
          const particleStyle = particleAnimation.build();

          return (
            <i
              key={index}
              className={`icon particle ${SVG_CLASSES[svgClassName]}`}
              style={particleStyle}
            />
          );
        })}
      </span>
    </ClientOnly>
  );
};

export default memo(ParticleComponent);
