const path = require("path");
const api = require("./api");

module.exports = function(app, config) {
  app.get("/statistikk/grid1d", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const punkter = decodeURI(req.query.punkter);
    const raster = decodeURI(req.query.raster);
    if (!punkter || !raster) return usage(req, res, examples.grid1d);
    const punkterPath = path.join(config.dataPath, punkter);
    const rasterPath = path.join(config.dataPath, raster);
    api.stat2d(punkterPath, rasterPath).then(stat => {
      res.send(stat);
    });
  });
  app.get("*", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const url = decodeURI(req.path);
    const rasterPath = path.join(config.dataPath, url);
    api.stat1d(rasterPath).then(stat => {
      res.send(stat);
    });
  });
  app.get("*?", (req, res) => {
    return usage(req, res);
  });
};

function usage(req, res, exampleUrl) {
  res.send({
    example: exampleUrl ? "https://" + req.headers.host + exampleUrl : examples
  });
}

const examples = {
  grid1d:
    "https://romlig.artsdatabanken.no/statistikk/grid1d?punkter=Biota/Plantae/Marchantiophyta/Jungermanniopsida&raster=Natur_i_Norge/Landskap/Landskapsgradient/Kystavstand"
};
