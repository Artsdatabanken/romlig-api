const PNG = require("pngjs").PNG;
const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const metersPerPixel = 1000;
const bounds = {
  left: -119000,
  bottom: 6420000,
  right: 1158000,
  top: 8000000
};

async function load(sourcePath, xyz) {
  const fn = path.join(sourcePath, "grid.32633.png");
  const data = await fsPromises.readFile(fn);
  var png = PNG.sync.read(data);
  png.metersPerPixel = metersPerPixel;
  png.bounds = bounds;
  return png;
}

module.exports = { load };
