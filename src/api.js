const fs = require("fs");
const fordeling2d = require("./fordeling2d");
const fordeling1d = require("./fordeling1d");
const raster = require("./kilde/raster");
const punkter = require("./kilde/punkter");
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
    const xyz = punkter.load(punktFn);
    const png = await raster.load(rasterFn);
    const stat = await fordeling2d(png, xyz);
    return { args: { punkter: punktFn, raster: rasterFn }, ...stat };
  } catch (e) {
    return { feil: { melding: e.message, ...e } };
  }
}

module.exports = { stat1d, stat2d };
