export const distance = (lat1, lon1, lat2, lon2, name) => {
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const distance = lon1 - lon2
  const radDistance = (Math.PI * distance) / 180

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.sin(radlat2) * Math.sin(radlat2) * Math.cos(radDistance)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  if (name === "K") {
    dist *= 1.609344
  }
  if (name === "N") {
    dist *= 0.8684
  }
  return dist
}