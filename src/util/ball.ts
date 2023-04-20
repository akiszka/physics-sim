export interface Ball {
  id: string;

  x: number;
  y: number;
  radius: 50;

  color: string;

  vx: number;
  vy: number;

  mass: number;
}

export function getNextPosition(ball: Ball): Ball {
  return {
    ...ball,
    x: ball.x + ball.vx,
    y: ball.y + ball.vy,
  };
}

export function getVelocityVector(angle: number): { vx: number; vy: number; } {
  const vx = Math.cos(angle);
  const vy = Math.sin(angle);

  return {
    vx: vx,
    vy: vy,
  };
}

export function getAngle(ball: Ball): number {
  return Math.atan2(ball.vy, ball.vx);
}

export function getDistance(ball1: Ball, ball2: Ball): number {
  return Math.sqrt(
    Math.pow(ball1.x - ball2.x, 2) + Math.pow(ball1.y - ball2.y, 2)
  );
}

export function getCollisionAngle(ball1: Ball, ball2: Ball): number {
  return Math.atan2(ball2.y - ball1.y, ball2.x - ball1.x);
}

export function areColliding(ball1: Ball, ball2: Ball): boolean {
  return getDistance(ball1, ball2) <= ball1.radius + ball2.radius;
}

export function isCollidingWithWall(ball: Ball, width: number, height: number): boolean {
  return ball.x - ball.radius <= 0 ||
    ball.x + ball.radius >= width ||
    ball.y - ball.radius <= 0 ||
    ball.y + ball.radius >= height;
}

export function getVelocity(ball: Ball): number {
  return Math.sqrt(Math.pow(ball.vx, 2) + Math.pow(ball.vy, 2));
}