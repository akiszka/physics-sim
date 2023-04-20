
import { Ball } from '@/util/ball';
import { rnd } from '@/util/pretty';
import { runSimulation } from '@/util/simulation';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const refresh = useCallback(() => setRefreshCounter((c) => c + 1), []);
  // const [stop, setStop] = useState(false);

  const [x1_0, setX1_0] = useState(100);
  const [y1_0, setY1_0] = useState(100);
  const [x2_0, setX2_0] = useState(190);
  const [y2_0, setY2_0] = useState(230);
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(2);

  const [coefficientOfRestitution, setCoefficientOfRestitution] = useState(1);

  const [vx1_0, setVx1_0] = useState(2);
  const [vy1_0, setVy1_0] = useState(2);
  const [vx2_0, setVx2_0] = useState(0);
  const [vy2_0, setVy2_0] = useState(0);

  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    return runSimulation(
      x1_0,
      y1_0,
      x2_0,
      y2_0,
      m1,
      m2,
      coefficientOfRestitution,
      vx1_0,
      vy1_0,
      vx2_0,
      vy2_0,
      setBalls
    );
  }, [refreshCounter]);

  return (
    <article className='flex flex-row w-screen h-screen justify-between'>
      <aside className='h-screen w-full bg-gray-600 text-white flex flex-col gap-4 p-4 items-start justify-start'>
        <h1 className='font-bold'>Symulator kolizji</h1>
        {/* <label className='flex flex-row gap-2'>
          Elastyczność:
          <input type='number' className='text-black'
            value={coefficientOfRestitution}
            onChange={(e) => { setCoefficientOfRestitution(Number(e.target.value)); }}
          />
        </label> */}
        <label className='flex flex-row gap-2'>
          M1:
          <input type='number' className='text-black'
            value={m1}
            onChange={(e) => { setM1(Number(e.target.value)); }}
          />
        </label>
        <label className='flex flex-row gap-2'>
          M2:
          <input type='number' className='text-black'
            value={m2}
            onChange={(e) => { setM2(Number(e.target.value)); }}
          />
        </label>
        <label className='flex flex-row gap-2'>
          X1_0:
          <input type='number' className='text-black'
            value={x1_0}
            onChange={(e) => { setX1_0(Number(e.target.value)); }}
          />
        </label>
        <label className='flex flex-row gap-2'>
          Y1_0:
          <input type='number' className='text-black'
            value={y1_0}
            onChange={(e) => { setY1_0(Number(e.target.value)); }}
          />
        </label>
        <label className='flex flex-row gap-2'>
          X2_0:
          <input type='number' className='text-black'
            value={x2_0}
            onChange={(e) => { setX2_0(Number(e.target.value)); }}
          />
        </label>
        <label className='flex flex-row gap-2'>
          Y2_0:
          <input type='number' className='text-black'
            value={y2_0}
            onChange={(e) => { setY2_0(Number(e.target.value)); }}
          />
        </label>
        <label className='flex flex-row gap-2'>
          VX1_0:
          <input type='number' className='text-black'
            value={vx1_0}
            onChange={(e) => { setVx1_0(Number(e.target.value)); }}
          />
        </label>
        <label className='flex flex-row gap-2'>
          VY1_0:
          <input type='number' className='text-black'
            value={vy1_0}
            onChange={(e) => { setVy1_0(Number(e.target.value)); }}
          />
        </label>
        <label className='flex flex-row gap-2'>
          VX2_0:
          <input type='number' className='text-black'
            value={vx2_0}
            onChange={(e) => { setVx2_0(Number(e.target.value)); }}
          />
        </label>
        <label className='flex flex-row gap-2'>
          VY2_0:
          <input type='number' className='text-black'
            value={vy2_0}
            onChange={(e) => { setVy2_0(Number(e.target.value)); }}
          />
        </label>

        <button onClick={refresh}>Odśwież</button>

        {balls.length >= 2 && <div className='mt-4'>
          VX_1 =  {rnd(balls[0].vx)}
          <br />
          VY_1 = {rnd(balls[0].vy)}
          <br />
          VX_2 = {rnd(balls[1].vx)}
          <br />
          VY_2 = {rnd(balls[1].vy)}
          {/* <br /> */}
          {/* <br />
          P1 = ({rnd(balls[0].x)}, {rnd(balls[0].y)})
          <br />
          P2 = ({rnd(balls[1].x)}, {rnd(balls[1].y)}) */}
        </div>}
      </aside>
      <main
        className="flex relative max-w-[100vw] max-h-screen h-full flex-col items-center justify-between aspect-square bg-gray-300"
      >
        <canvas
          className="absolute top-0 left-0"
          width={100}
          height={100}
        />
      </main>
    </article>
  );
}