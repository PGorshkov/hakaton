const speed = 50 * 50 / 3

export default function getTimeInMeters (distance) {
  const timeInWay = distance / speed

  const timeInRest = timeInWay / 4 | 0
  // const timeInRest = (timeInWay % 4 === 0) ? (timeInWay / 4 | 0) - 1 : timeInWay / 4 | 0

  return distance / speed + timeInRest
}
