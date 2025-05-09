export const TWO_PI = Math.PI * 2

export const degreesToRadians = degrees => (degrees * Math.PI) / 180

export const radiansToDegrees = radians => (180 * radians) / Math.PI

export const midAngle = arc => arc.startAngle + (arc.endAngle - arc.startAngle) / 2

export const positionFromAngle = (angle, distance) => ({
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
})

/**
 * Normalize given angle (degrees) in the 0~360 range.
 *
 * @param {number} angle
 * @return {number}
 */
export const normalizeAngleDegrees = angle => {
    let absAngle = angle % 360
    if (absAngle < 0) absAngle += 360

    return absAngle
}

/**
 * Ensure the absolute difference between start and end angles
 * is at most given length.
 *
 * @param startAngle - in degrees
 * @param endAngle   - in degrees
 * @param length     - in degrees
 *
 * @returns {[number, number]}
 */
export const clampArc = (startAngle, endAngle, length = 360) => {
    let clampedEndAngle = endAngle
    if (Math.abs(endAngle - startAngle) > length) {
        clampedEndAngle = startAngle + (endAngle > startAngle ? length : -length)
    }

    return [startAngle, clampedEndAngle]
}
