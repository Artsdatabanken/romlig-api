const PNG = require("pngjs").PNG;
const fs = require("fs");
const fsPromises = fs.promises;
const gaussian = require("./gaussianBlur");
const fordeling1d = require("./fordeling1d");

// Fordeling av punkter innenfor en gradientens område.
// I og med at vi har relativt tynt datagrunnlag på det meste
// og for å få en passe smooth graf grupperer vi i 256 bøtter
// Sagt på en annen måte: Hvor mange punkter treffer innenfor
// hvert av gradientens kvantiserte trinn
async function fordeling2d(png, xyz) {
  const r = Array(256).fill(0);

  for (const co of xyz) {
    const x = parseInt((co[0] - png.bounds.left) / png.metersPerPixel);
    const y = parseInt((png.bounds.top - co[1]) / png.metersPerPixel);
    var idx = (png.width * y + x) << 2;
    const sample = png.data[idx];
    r[sample]++;
  }

  const grad = fordeling1d(png);

  return { fordeling: gaussian(r), rå: r, grad: gaussian(grad) };
}

module.exports = fordeling2d;
