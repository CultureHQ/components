const getHumanSize = size => {
  const units = ["bytes", "KB", "MB", "GB"];
  let curSize = size;

  for (let idx = 0; idx < units.length; idx += 1) {
    if (curSize < 1024) {
      return `${Math.round(curSize * 100) / 100} ${units[idx]}`;
    }
    curSize /= 1024;
  }

  return `${size} bytes`;
};

export default getHumanSize;
