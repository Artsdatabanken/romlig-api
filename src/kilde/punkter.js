const fs = require("fs");
const fsPromises = fs.promises;

async function load(fn) {
  const raw = await fs.readFileSync(fn);
  const geojson = JSON.parse(JSON.parse(raw));
  const xyz = geojson2xyz(geojson);
  return xyz;
}

module.exports = { load };
