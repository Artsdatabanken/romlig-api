const fs = require("fs");
const fsPromises = fs.promises;
const geojson2xyz = require("./geojson2xyz");
const path = require("path");

function load(sourcePath) {
  const fn = path.join(sourcePath, "observasjoner.32633.geojson");
  const raw = fs.readFileSync(fn);
  const geojson = JSON.parse(JSON.parse(raw));
  const xyz = geojson2xyz(geojson);
  return xyz;
}

module.exports = { load };
