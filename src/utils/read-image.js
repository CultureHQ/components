import getRotation from "./get-rotation";

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

const getNonRotatedDimensions = (image, maxWidth, maxHeight) => {
  let height = Math.min(image.height, maxHeight);
  let width = image.width * (height / image.height);

  if (width > maxWidth) {
    height *= (maxWidth / width);
    width = maxWidth;
  }

  return { left: `calc(50% - ${width / 2}px)`, height, width };
};

const getRotatedDimensions = (image, maxWidth, maxHeight) => {
  let height = Math.min(image.height, maxHeight) * (image.height / image.width);
  let width = image.width * (height / image.height);

  if (height > maxWidth) {
    width *= (maxWidth / height);
    height = maxWidth;
  }

  return { left: `calc(50% - ${height / 2}px)`, height, width };
};

const getImagePromise = image => new Promise((onload, onerror) => (
  Object.assign(image, { onload, onerror })
));

const readImage = (image, preview, maxWidth, maxHeight) => {
  const imageObj = new Image();
  const promises = [getRotation(image), getImagePromise(imageObj)];

  imageObj.src = preview;

  return Promise.all(promises).then(([rotation]) => {
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
