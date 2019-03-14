const path = require("path");
const grid1d = require("./grid1d");

module.exports = function(app, config) {
  app.get("/statistikk/grid1d", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const punkter = req.query.punkter;
    const raster = req.query.raster;
    if (!punkter || !raster) return usage(req, res, examples.grid1d);
    const punkterPath = path.join(
      config.dataPath,
      path.join(punkter, "observasjoner.32633.geojson")
    );
    const rasterPath = path.join(
      config.dataPath,
      path.join(raster, "grid.32633.png")
    );
    grid1d(punkterPath, rasterPath).then(stat => {
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
