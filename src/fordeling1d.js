// Fordeling av enkeltgradient over gradientens område.
// I og med at vi har relativt tynt datagrunnlag på det meste
// og for å få en passe smooth graf grupperer vi i 256 bøtter
function calc(png) {
  const grad = Array(256).fill(0);
  for (let x = 0; x < png.width; x++)
    for (let y = 0; y < png.height; y++) {
      var idx = (png.width * y + x) << 2;
      const sample = png.data[idx];
      grad[sample]++;
    }

  return grad;
}

module.exports = calc;
