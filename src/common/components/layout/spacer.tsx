const spacerSizes = {
  xs: "h-32pxr tablet:h-24pxr",
  sm: "h-48pxr tablet:h-40pxr",
  base: "h-96pxr tablet:h-24pxr",
  lg: "h-144pxr tablet:h-88pxr",
  xl: "h-192pxr tablet:h-160pxr",
  "2xl": "h-256pxr tablet:h-224pxr",
};

interface SpacerProps {
  size: keyof typeof spacerSizes;
  className?: string;
}

const Spacer = ({ size, className = "" }: SpacerProps) => {
  return <div className={`${className} ${spacerSizes[size]}`} />;
};

export default Spacer;
