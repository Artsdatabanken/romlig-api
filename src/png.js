const PNG = require("pngjs").PNG;
const fs = require("fs");
const fsPromises = fs.promises;
const gaussian = require("./gaussian");

const metersPerPixel = 1000;
const bounds = {
  left: -119000,
  bottom: 6420000,
  right: 1158000,
  top: 8000000
};

async function calc(fn, xyz) {
  const data = await fsPromises.readFile(fn);
  var png = PNG.sync.read(data);
  const r = Array(256).fill(0);
  const grad = Array(256).fill(0);

  for (const co of xyz) {
    const x = parseInt((co[0] - bounds.left) / metersPerPixel);
    const y = parseInt((bounds.top - co[1]) / metersPerPixel);
    var idx = (png.width * y + x) << 2;
    const sample = png.data[idx];
    r[sample]++;
  }

  for (let x = 0; x < png.width; x++)
    for (let y = 0; y < png.height; y++) {
      var idx = (png.width * y + x) << 2;
      const sample = png.data[idx];
      grad[sample]++;
    }

  return { fordeling: gaussian(r), rå: r, grad: gaussian(grad) };
}

module.exports = calc;
