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

const getRotationStyles = (image, rotation, maxHeight) => {
  const scaledWidth = image.width / image.height * maxHeight;
  const scaledHeight = image.height / image.width * maxHeight;

  const halfWidth = (rotation >= 5 ? scaledHeight : scaledWidth) / 2;

  return {
    ...ROTATIONS[rotation],
    left: `calc(50% - ${halfWidth}px)`,
    height: rotation >= 5 ? scaledHeight : maxHeight
  };
};

const getImagePromise = image => new Promise((onload, onerror) => (
  Object.assign(image, { onload, onerror })
));

const readImage = (image, preview, maxHeight) => {
  const imageObj = new Image();
  const promises = [getRotation(image), getImagePromise(imageObj)];

  imageObj.src = preview;

  return Promise.all(promises).then(([rotation]) => ({
    src: imageObj.src,
    styles: getRotationStyles(imageObj, rotation, maxHeight)
  }));
};

export default readImage;
