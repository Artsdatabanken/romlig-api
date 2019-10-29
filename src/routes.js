const path = require("path");
const api = require("./api");

module.exports = function(app, config) {
  app.get("/v1/dual", (req, res) => {
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
  app.get("v1/single", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const url = req.query.raster;
    const rasterPath = path.join(config.dataPath, url);
    api.stat1d(rasterPath).then(stat => {
      res.send(stat);
    });
  });
};

const examples = {
  grid1d:
    "https://romlig.artsdatabanken.no/statistikk/grid1d?punkter=Biota/Plantae/Marchantiophyta/Jungermanniopsida&raster=Natur_i_Norge/Landskap/Landskapsgradient/Kystavstand"
};
