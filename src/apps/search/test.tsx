import * as React from 'react';

import { StaticImage } from 'gatsby-plugin-image';

const ReactLogoParticle = ({ style, size }: { style: Record<string, unknown>; size: number }) => {
  return (
    <StaticImage
      className="particle"
      alt="particle"
      src="../../images/skills/react.svg"
      placeholder="blurred"
      style={style}
      width={size}
      height={size}
    />
  );
};

const ParticlePlayground = () => {
  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const [isRender, setIsRender] = React.useState(false);

  React.useEffect(() => {
    setIsRender(true);
  }, []);

  if (!isRender) return null;

  return (
    <span className="particle-pen">
      {Array.from({ length: 40 }).map((_, index) => (
        <ReactLogoParticle
          key={index}
          style={{
            '--x': random(20, 80),
            '--y': random(20, 80),
            '--duration': random(6, 20),
            '--delay': random(1, 10),
            '--alpha': random(40, 90) / 100,
            '--origin-x': `${Math.random() > 0.5 ? random(300, 800) * -1 : random(300, 800)}%`,
            '--origin-y': `${Math.random() > 0.5 ? random(300, 800) * -1 : random(300, 800)}%`,
          }}
          size={random(40, 90) / 100}
        />
      ))}
    </span>
  );
};

export default ParticlePlayground;
