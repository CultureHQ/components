import getRotation from "./getRotation";

export const ROTATIONS = [
  {},
  {},
  { transform: "rotateY(180deg)" },
  { transform: "rotate(180deg)" },
  { transform: "rotate(180deg) rotateY(180deg)" },
  { transform: "rotate(270deg) rotateY(180deg)", transformOrigin: "top left" },
  { transform: "translateY(-100%) rotate(90deg)", transformOrigin: "bottom left" },
  {
    transform: "translateY(-100%) translateX(-100%) rotate(90deg) rotateY(180deg)",
    transformOrigin: "bottom right"
  },
  { transform: "translateX(-100%) rotate(270deg)", transformOrigin: "top right" }
];

const getNonRotatedDimensions = (image: HTMLImageElement, maxWidth: number, maxHeight: number) => {
  let height = Math.min(image.height, maxHeight);
  let width = image.width * (height / image.height);

  if (width > maxWidth) {
    height *= (maxWidth / width);
    width = maxWidth;
  }

  return { left: `calc(50% - ${width / 2}px)`, height, width };
};

const getRotatedDimensions = (image: HTMLImageElement, maxWidth: number, maxHeight: number) => {
  let height = Math.min(image.height, maxHeight) * (image.height / image.width);
  let width = image.width * (height / image.height);

  if (height > maxWidth) {
    width *= (maxWidth / height);
    height = maxWidth;
  }

  return { left: `calc(50% - ${height / 2}px)`, height, width };
};

const isMobileSafari = (userAgent: string) => (
  /iP(ad|od|hone)/i.test(userAgent)
  && /WebKit/i.test(userAgent)
  && !(/(CriOS|FxiOS|OPiOS|mercury)/i.test(userAgent))
);

type Readable = Blob | File | string | null;

// In mobile safari EXIF data is read and images are automatically rotated, so
// we should bail out and not attempt to read the EXIF data ourselves.
const getNormalRotation = (image: Readable): Promise<number> => (
  isMobileSafari(navigator.userAgent) ? Promise.resolve(1) : getRotation(image)
);

const getImagePromise = (image: HTMLImageElement, preview: Readable): Promise<HTMLImageElement> => (
  new Promise((onload, onerror) => (
    Object.assign(image, { onload, onerror, src: preview })
  ))
);

type ReadImage = {
  src: string;
  styles: { [key: string]: undefined | string | number };
};

const readImage = (
  image: Readable, preview: Readable, maxWidth: number, maxHeight: number
): Promise<ReadImage> => {
  const imageObj = new Image();
  const promises: [Promise<number>, Promise<HTMLImageElement>] = [
    getNormalRotation(image),
    getImagePromise(imageObj, preview)
  ];

  return Promise.all(promises).then(responses => {
    const rotation = responses[0];
    const dimensions = rotation >= 5
      ? getRotatedDimensions(imageObj, maxWidth, maxHeight)
      : getNonRotatedDimensions(imageObj, maxWidth, maxHeight);

    return {
      src: imageObj.src,
      styles: { ...ROTATIONS[rotation], ...dimensions }
    };
  });
};

export default readImage;
