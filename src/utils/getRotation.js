const getRotation = file => new Promise((resolve, reject) => {
  if (!(file instanceof File)) {
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

    while (idx < maxBytes - 2) {
      const uint16 = scanner.getUint16(idx);
      idx += 2;

      switch (uint16) {
        case 0xFFE1: // Start of EXIF
          maxBytes = scanner.getUint16(idx) - idx;
          idx += 2;
          break;
        case 0x0112: // Orientation tag
          rotation = scanner.getUint16(idx + 6);
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
