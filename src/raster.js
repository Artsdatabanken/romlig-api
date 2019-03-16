const PNG = require("pngjs").PNG;
const fs = require("fs");
const fsPromises = fs.promises;

const metersPerPixel = 1000;
const bounds = {
  left: -119000,
  bottom: 6420000,
  right: 1158000,
  top: 8000000
};

async function load(fn, xyz) {
  const data = await fsPromises.readFile(fn);
  var png = PNG.sync.read(data);
  png.metersPerPixel = metersPerPixel;
  png.bounds = bounds;
  return png;
}

module.exports = { load };
