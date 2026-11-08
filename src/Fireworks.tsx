import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; vx: number; vy: number; life: number; hue: number; r: number };

export default function Fireworks({ dark }: { dark: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(dark);
  darkRef.current = dark;

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    const sparks: Spark[] = [];
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => { w = cv.width = innerWidth; h = cv.height = innerHeight; };
    resize();
    addEventListener("resize", resize);

    const burst = (x: number, y: number) => {
      const hue = [120, 145, 45, 38, 330][Math.floor(Math.random() * 5)];
      const n = calm ? 20 : 70;
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n, s = 1.5 + Math.random() * 4;
        sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, hue: hue + Math.random() * 25, r: 1.5 + Math.random() * 1.5 });
      }
    };
    const auto = setInterval(() => burst(w * (0.1 + Math.random() * 0.8), h * (0.1 + Math.random() * 0.45)), 1400);
    burst(w / 2, h * 0.3);
    const onClick = (e: MouseEvent) => burst(e.clientX, e.clientY);
    addEventListener("click", onClick);

    const loop = () => {
      const d = darkRef.current;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = d ? "rgba(2,10,5,0.22)" : "rgba(238,250,236,0.28)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = d ? "lighter" : "source-over";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.vx *= 0.985; p.vy *= 0.985; p.life -= 0.012;
        if (p.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue},100%,${d ? 60 : 40}%,${p.life})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(auto);
      removeEventListener("resize", resize);
      removeEventListener("click", onClick);
    };
  }, []);

  return <canvas ref={ref} className="fx" aria-hidden="true" />;
}
