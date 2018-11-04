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

const getImagePromise = image => new Promise((resolve, reject) => {
  image.onload = resolve;
  image.onerror = reject;
});

const readImage = (preview, maxHeight) => {
  const image = new Image();
  const promises = [getRotation(preview), getImagePromise(image)];

  image.src = typeof preview === "string" ? preview : URL.createObjectURL(preview);

  return Promise.all(promises).then(([rotation]) => ({
    src: image.src,
    styles: getRotationStyles(image, rotation, maxHeight)
  }));
};

export default readImage;
