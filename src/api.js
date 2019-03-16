const fs = require("fs");
const geojson2xyz = require("./geojson2xyz");
const fordeling2d = require("./fordeling2d");
const fordeling1d = require("./fordeling1d");
const raster = require("./raster");
const gaussianBlur = require("./gaussianBlur");

async function stat1d(rasterFn) {
  try {
    const png = await raster.load(rasterFn);
    const stat = fordeling1d(png);
    return gaussianBlur(stat);
  } catch (e) {
    return { feil: { melding: e.message, ...e } };
  }
}

async function stat2d(punktFn, rasterFn) {
  try {
    const xyz = readGeojson(punktFn);
    const png = await raster.load(rasterFn);
    const stat = await fordeling2d(png, xyz);
    return { args: { punkter: punktFn, raster: rasterFn }, ...stat };
  } catch (e) {
    return { feil: { melding: e.message, ...e } };
  }
}

function readGeojson(fn) {
  const raw = fs.readFileSync(fn);
  const geojson = JSON.parse(JSON.parse(raw));
  const xyz = geojson2xyz(geojson);
  return xyz;
}

module.exports = { stat1d, stat2d };
