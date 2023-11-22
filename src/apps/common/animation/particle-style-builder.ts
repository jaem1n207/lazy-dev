import type { CSSProperties } from 'react';

declare module 'react' {
  interface CSSProperties {
    '--x'?: number;
    '--y'?: number;
    '--duration'?: number;
    '--delay'?: number;
    '--size'?: number;
    '--random-diagonal'?: string;
  }
}

interface IRandomNumberGenerator {
  generate(min: number, max: number): number;
}

interface IParticleStyle {
  getStyles(): CSSProperties;
}

const halfChance = () => Math.random() < 0.5;

export class RandomNumberGenerator implements IRandomNumberGenerator {
  generate(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

class BaseParticleStyle implements IParticleStyle {
  protected styles: CSSProperties = {};

  constructor(protected rng: IRandomNumberGenerator) {}

  getStyles(): CSSProperties {
    return this.styles;
  }
}

class ParticleStyleBuilder extends BaseParticleStyle {
  setX(x: number): this {
    this.styles['--x'] = x;
    return this;
  }

  setY(y: number): this {
    this.styles['--y'] = y;
    return this;
  }

  setDuration(duration: number): this {
    this.styles['--duration'] = duration;
    return this;
  }

  setDelay(delay: number): this {
    this.styles['--delay'] = delay;
    return this;
  }

  setSize(size: number): this {
    this.styles['--size'] = size;
    return this;
  }

  setRandomDiagonal(randomDiagonal: string): this {
    this.styles['--random-diagonal'] = randomDiagonal;
    return this;
  }

  build(): CSSProperties {
    return this.styles;
  }
}

export class DiagonalSlideFromTopParticle extends ParticleStyleBuilder {
  constructor(rng: IRandomNumberGenerator) {
    super(rng);
    this.setX(rng.generate(20, 80))
      .setY(rng.generate(50, 80))
      .setDuration(rng.generate(2, 4))
      .setDelay(rng.generate(2, 20) / 10)
      .setSize(rng.generate(6, 9))
      .setRandomDiagonal(`${halfChance() ? '-' : ''}${rng.generate(2, 6) * 100}%`);
  }
}
