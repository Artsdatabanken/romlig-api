const gauss = [0.1914624613, 0.1498822848, 0.09184805266, 0.04405706932]; // 0.4 ...

function gaussian(data) {
  const len = data.length;
  const r = new Array(len).fill(0);
  for (let i = 0; i < data.length; i++) {
    for (let offset = 0; offset < gauss.length; offset++) {
      if (i + offset < len) r[i] += gauss[offset] * data[i + offset];
      if (i - offset >= 0) r[i] += gauss[offset] * data[i - offset];
    }
  }
  return r;
}

module.exports = gaussian;
