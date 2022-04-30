const speed = 50 * 5 / 18

export default function getTimeInMeters (distance) {
  // const timeInWay = distance / speed

  // const timeInRest = timeInWay / 4 | 0
  // const timeInRest = (timeInWay % 4 === 0) ? (timeInWay / 4 | 0) - 1 : timeInWay / 4 | 0

  return distance / speed * 1000
}
