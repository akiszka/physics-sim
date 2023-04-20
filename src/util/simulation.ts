import { Ball, areColliding, getNextPosition, isCollidingWithWall } from "./ball";
import { getBallsAfterCollision } from "./collision";

const FPS = 35;

export function runSimulation(
  x1_0: number,
  y1_0: number,
  x2_0: number,
  y2_0: number,
  m1: number,
  m2: number,
  coefficientOfRestitution: number,
  vx1_0: number,
  vy1_0: number,
  vx2_0: number,
  vy2_0: number,
  ballsCallback: (balls: Ball[]) => void
) {
  const rect = document.querySelector('main')!.getBoundingClientRect();

  let balls = getInitialBalls(rect);
  balls[0].x = x1_0;
  balls[0].y = y1_0;
  balls[0].mass = m1;
  balls[1].x = x2_0;
  balls[1].y = y2_0;
  balls[1].mass = m2;

  balls[0].vx = vx1_0;
  balls[0].vy = vy1_0;
  balls[1].vx = vx2_0;
  balls[1].vy = vy2_0;

  const canvas = document.querySelector('canvas')! as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  const dimension = Math.min(rect.width, rect.height);

  canvas.width = dimension;
  canvas.height = dimension;

  const interval = setInterval(() => {
    ctx.clearRect(0, 0, dimension, dimension);

    // draw grid every 100 pixels
    for (let i = 0; i < dimension; i += 100) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, dimension);
      ctx.stroke();
    }

    for (let i = 0; i < dimension; i += 100) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(dimension, i);
      ctx.stroke();
    }

    // add arrows to the coordinate system
    ctx.beginPath();
    ctx.moveTo(0, dimension - 20);
    ctx.lineTo(0, dimension);
    ctx.lineTo(20, dimension - 20);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(dimension - 20, 0);
    ctx.lineTo(dimension, 0);
    ctx.lineTo(dimension - 20, 20);
    ctx.fillStyle = 'black';
    ctx.fill();

    // write x and y
    ctx.font = '20px Arial';
    ctx.fillText('x', dimension - 40, 18);
    ctx.fillText('y', 6, dimension - 30);

    ctx.font = '15px Arial';
    ctx.fillText('(0, 0)', 6, 20);

    balls.forEach((ball) => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
      ctx.fillStyle = ball.color;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(ball.x, ball.y);
      ctx.lineTo(ball.x + ball.vx * 10, ball.y + ball.vy * 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(ball.x + ball.vx * 10, ball.y + ball.vy * 10, 2, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();
    });

    balls = getNextBalls(balls, rect, coefficientOfRestitution);

    ballsCallback(balls);
  }, Math.floor(1000 / FPS));

  return () => clearInterval(interval);
}



export function getInitialBalls(rect: DOMRect): Ball[] {
  return [
    {
      x: 100,
      y: 100,
      radius: 50,
      vx: 2,
      vy: 2,
      color: 'blue',
      id: 'ball-1',
      mass: 2
    },
    {
      x: 190,
      y: 230,
      radius: 50,
      color: 'red',
      vx: 0,
      vy: 0,
      id: 'ball-2',
      mass: 2
    }
  ];
}

export function getNextBalls(balls: Ball[], rect: DOMRect, coeff: number): Ball[] {
  const proposedNextBalls = balls.map((ball) => {
    const nextPosition = getNextPosition(ball);
    if (isCollidingWithWall(nextPosition, rect.width, rect.height)) {
      if (nextPosition.y - ball.radius <= 0) {
        return {
          ...ball,
          y: ball.radius + 1,
          vy: -ball.vy,
        };
      } else if (nextPosition.y + ball.radius >= rect.height) {
        return {
          ...ball,
          y: rect.height - ball.radius - 1,
          vy: -ball.vy,
        };
      } else if (nextPosition.x - ball.radius <= 0) {
        return {
          ...ball,
          x: ball.radius + 1,
          vx: -ball.vx,
        };
      } else {
        return {
          ...ball,
          x: rect.width - ball.radius - 1,
          vx: -ball.vx,
        };
      }
    }

    return nextPosition;
  });

  // check for collisions
  for (let i = 0; i < proposedNextBalls.length; i++) {
    for (let j = i + 1; j < proposedNextBalls.length; j++) {
      const ball1 = proposedNextBalls[i];
      const ball2 = proposedNextBalls[j];

      if (!areColliding(ball1, ball2)) continue;

      let [ball1_next, ball2_next] = getBallsAfterCollision(ball1, ball2, coeff);
      ball1_next = getNextPosition(ball1_next);
      ball2_next = getNextPosition(ball2_next);

      proposedNextBalls[i] = ball1_next;
      proposedNextBalls[j] = ball2_next;

      break;
    }
  }

  return proposedNextBalls;
}