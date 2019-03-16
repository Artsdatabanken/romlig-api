// Fryktelig inneffektivt, men brukes under prototyping for å teste konsepter
function geojson2xyz(geojson, gridSizeMeters = 250) {
  const r = [];
  geojson.features.forEach(f => {
    if (f.geometry.type !== "Point") return;
    const q = f.geometry.coordinates.map(meters =>
      quantize(meters, gridSizeMeters)
    );
    r.push(q);
  });
  return r;
}

const quantize = (meters, gridsizeMeters) =>
  parseInt(meters / gridsizeMeters).toFixed(0) * gridsizeMeters;

module.exports = geojson2xyz;
