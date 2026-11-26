import { useEffect, useRef } from 'react'
import type { MotionValue } from 'motion/react'

type Star = { x: number; y: number; z: number; color: string }

const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#ffe08a', '#c7a6ff', '#9fe6ff']
const COUNT = 420

const spawn = (anyDepth: boolean): Star => ({
  x: Math.random() * 2 - 1,
  y: Math.random() * 2 - 1,
  z: anyDepth ? 0.05 + Math.random() * 0.95 : 1,
  color: COLORS[(Math.random() * COLORS.length) | 0],
})

/**
 * Stjärnfält som blir till ljusstrimmor när `speed` ökar.
 * speed ≈ 1 = lugnt svävande, speed ≈ 70 = hyperfart in i det svarta hålet.
 */
export default function WarpField({ speed }: { speed: MotionValue<number> }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: COUNT }, () => spawn(true))
    let angle = 0
    let last = performance.now()
    let raf = 0

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const s = speed.get()
      const mag = Math.abs(s)
      const v = 0.03 + s * 0.028 // djup per sekund (negativ = stjärnorna sugs in mot mitten)
      const spin = 0.05 + mag * 0.035 // virveln drar åt sig stjärnorna
      const prevAngle = angle
      angle += spin * dt

      const cx = w / 2
      const cy = h / 2
      const f = Math.max(w, h) * 0.5
      const alpha = Math.min(1, 0.35 + mag / 14)
      const trail = Math.min(0.35, 0.02 + mag * 0.006) // hur långa strimmorna blir

      ctx.clearRect(0, 0, w, h)
      ctx.lineCap = 'round'

      for (let i = 0; i < stars.length; i++) {
        const st = stars[i]
        st.z -= v * dt
        if (st.z <= 0.02) {
          stars[i] = spawn(false)
          continue
        }
        if (st.z > 1.2) {
          // Insugen i mitten – dyker upp igen ute vid kanten
          stars[i] = { ...spawn(false), z: 0.12 + Math.random() * 0.4 }
          continue
        }
        const pz = v >= 0 ? Math.min(1, st.z + trail) : Math.max(0.02, st.z - trail)

        const project = (z: number, a: number) => {
          const c = Math.cos(a)
          const sn = Math.sin(a)
          const rx = st.x * c - st.y * sn
          const ry = st.x * sn + st.y * c
          return [cx + (rx / z) * f, cy + (ry / z) * f] as const
        }
        const [x1, y1] = project(st.z, angle)
        const [x0, y0] = project(pz, prevAngle - trail * 1.5)
        if (x1 < -50 || x1 > w + 50 || y1 < -50 || y1 > h + 50) {
          stars[i] = spawn(false)
          continue
        }

        const near = 1 - st.z
        ctx.globalAlpha = alpha * (0.25 + near * 0.75)
        ctx.strokeStyle = st.color
        ctx.lineWidth = (0.6 + near * 2.2) * dpr
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x1 + 0.1, y1 + 0.1)
        ctx.stroke()
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [speed])

  return <canvas ref={ref} className="warp" aria-hidden />
}
