const cities = ["axx", "axy", "az", "axd", "aa", "abc", "abs", "p"];
const xValues = [0, 1, 2, 4, 5, 0, 1, 0];
const yValues = [1, 2, 5, 3, 4, 2, 0, 2];
const queries = ["axx", "axy", "abs", "zmm"];

const nearestNeighborCity = ({
  cities,
  xValues,
  yValues,
  queryCityX,
  queryCityY,
}) => {
  let smallestDistance = Infinity;
  let resultCity = "";

  for (let i = 0; i < cities.length; i++) {
    // potential valid city
    if (xValues[i] === queryCityX || queryCityY === yValues[i]) {
      const cityName = cities[i];
      const manhattanDistance =
        Math.abs(xValues[i] - queryCityX) + Math.abs(yValues[i] - queryCityY);

      if (manhattanDistance <= smallestDistance) {
        if (manhattanDistance === smallestDistance) {
          resultCity =
            resultCity.length === 0
              ? cityName
              : cityName.length < resultCity.length
              ? cityName
              : resultCity;
        } else {
          smallestDistance = manhattanDistance;
          resultCity = cityName;
        }
      }
    }
  }
  return resultCity ? resultCity : "NONE";
};

console.log(
  nearestNeighborCity({
    cities,
    xValues,
    yValues,
    queryCityX: 1,
    queryCityY: 2,
  })
);

console.log(
  nearestNeighborCity({
    cities,
    xValues,
    yValues,
    queryCityX: 0,
    queryCityY: 2,
  })
);
