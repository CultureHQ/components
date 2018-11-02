const getRotation = file => new Promise((resolve, reject) => {
  if (!file || typeof file === "string") {
    resolve(1);
    return;
  }

  const reader = new FileReader();

  reader.onerror = reject;
  reader.onloadend = () => {
    const scanner = new DataView(reader.result);

    let idx = 0;
    let rotation = 1;

    if (reader.result.length < 2 || scanner.getUint16(idx) !== 0xFFD8) {
      return resolve(1);
    }

    idx += 2;
    let maxBytes = scanner.byteLength;
    let littleEndian = false;

    while (idx < maxBytes - 2) {
      const uint16 = scanner.getUint16(idx, littleEndian);
      idx += 2;

      switch (uint16) {
        case 0xFFE1: // Start of EXIF
          // II (0x4949) Indicates Intel format - Little Endian
          // MM (0x4D4D) Indicates Motorola format - Big Endian
          if (scanner.getUint16(idx + 8) === 0x4949) {
            littleEndian = true;
          }

          maxBytes = scanner.getUint16(idx, littleEndian) - idx;
          idx += 2;
          break;
        case 0x0112: // Orientation tag
          rotation = scanner.getUint16(idx + 6, littleEndian);
          maxBytes = 0;
          break;
        default:
          break;
      }
    }

    return resolve(rotation);
  };

  reader.readAsArrayBuffer(file);
});

export default getRotation;
