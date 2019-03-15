const fs = require("fs");
const geojson2xyz = require("./geojson2xyz");
const png = require("./png");

async function statistikk(punktFn, rasterFn) {
  try {
    const xyz = readGeojson(punktFn);
    const stat = await png(rasterFn, xyz);
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

module.exports = statistikk;
