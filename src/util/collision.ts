import { Ball, getCollisionAngle, getVelocity } from "./ball";

// this function will calculate the velocity of the balls after the collision
// the colltion will preserve the momentum of the balls
// and their kinetic energy
// the function will return the new balls with the new velocities
export function getBallsAfterCollision(ball1: Ball, ball2: Ball, coeff: number): [Ball, Ball] {
  const angle = getCollisionAngle(ball1, ball2);

  const m1 = ball1.mass;
  const m2 = ball2.mass;

  const u1 = getVelocity(ball1);
  const u2 = getVelocity(ball2);

  const v1 = (u1 * (m1 - m2) + 2 * m2 * u2) / (m1 + m2);
  const v2 = (u2 * (m2 - m1) + 2 * m1 * u1) / (m1 + m2);

  const vx1 = v1 * Math.cos(angle);
  const vy1 = v1 * Math.sin(angle);

  const vx2 = v2 * Math.cos(angle + Math.PI);
  const vy2 = v2 * Math.sin(angle + Math.PI);

  const dx = ball2.x - ball1.x;
  const dy = ball2.y - ball1.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const totalRadius = ball1.radius + ball2.radius;

  if (dist <= totalRadius) {
    // balls are overlapping, move them apart
    const correction = ((totalRadius - dist) / 2.0) + 0.1;
    const correctionX = correction * dx / dist;
    const correctionY = correction * dy / dist;

    ball1.x -= correctionX;
    ball1.y -= correctionY;
    ball2.x += correctionX;
    ball2.y += correctionY;

    // compute collision normal
    const nx = dx / dist;
    const ny = dy / dist;

    // compute relative velocity along collision normal
    const vRel = (ball2.vx - ball1.vx) * nx + (ball2.vy - ball1.vy) * ny;

    if (vRel < 0) {
      // reverse velocities along collision normal
      const impulse = (-(1 + coeff) * vRel) / (1 / m1 + 1 / m2);
      ball1.vx -= impulse * nx / m1;
      ball1.vy -= impulse * ny / m1;
      ball2.vx += impulse * nx / m2;
      ball2.vy += impulse * ny / m2;
    }
  } else {
    // no overlap, proceed with collision calculation
    ball1.vx = vx1;
    ball1.vy = vy1;
    ball2.vx = vx2;
    ball2.vy = vy2;
  }

  return [ball1, ball2];
}