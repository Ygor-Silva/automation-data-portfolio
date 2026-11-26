'use client';

import React from 'react';

/**
 * Fundo "Campo magnético": grade de pontos que respira devagar, se afasta do cursor
 * como limalha num ímã e forma uma onda no clique/toque.
 * Canvas fixo, sem re-render do React; pausa com a aba oculta e fica estático
 * com "reduzir movimento".
 */
export default function MagneticDotField() {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)');
    const K = 1; // intensidade 5 de 10 na prévia
    type Ponto = { x: number; y: number; vin: number; ox: number; oy: number; tom: number };
    let W = 0, H = 0, pts: Ponto[] = [];
    const mouse = { x: -9999, y: -9999, ativo: false };
    const ondas: { x: number; y: number; t0: number }[] = [];
    let raf = 0;

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = W < 640 ? 20 : 22;
      const ox = (W % gap) / 2 + gap / 2, oy = (H % gap) / 2 + gap / 2;
      pts = [];
      for (let y = oy; y < H; y += gap) for (let x = ox; x < W; x += gap) {
        const dx = (x - W / 2) / (W / 2), dy = (y - H / 2) / (H / 2);
        const vin = Math.max(0, 1 - Math.pow(Math.hypot(dx * 0.85, dy), 2.2) * 0.55); // esmaece nas bordas
        // ciano à esquerda/cima, violeta à direita/baixo, com leve mistura
        const tom = Math.sin(x * 0.004 + y * 0.003) * 0.5 + (x / W + y / H) * 0.5 - 0.5;
        pts.push({ x, y, vin, ox: 0, oy: 0, tom });
      }
      if (reduz.matches) desenhar(0);
    };

    const desenhar = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const s = t * 0.00012;
      for (let i = ondas.length - 1; i >= 0; i--) if (t - ondas[i].t0 > 2600) ondas.splice(i, 1);

      for (const p of pts) {
        let luz = 0.25 + 0.2 * Math.sin(s * 9 + (p.x + p.y) * 0.004); // a grade respira
        let tx = 0, ty = 0;
        if (mouse.ativo) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy), R = 190;
          if (d < R) {
            const f = 1 - d / R;
            luz += f * f * 1.1;
            if (d > 0.1) { tx = (dx / d) * f * f * 26; ty = (dy / d) * f * f * 26; }
          }
        }
        for (const o of ondas) {
          const r = (t - o.t0) * 0.42, d = Math.hypot(p.x - o.x, p.y - o.y), w = Math.abs(d - r);
          if (w < 26) {
            const a = (1 - w / 26) * (1 - (t - o.t0) / 2600);
            luz += a * 1.3;
            if (d > 0.1) { tx += ((p.x - o.x) / d) * a * 5; ty += ((p.y - o.y) / d) * a * 5; }
          }
        }
        p.ox += (tx - p.ox) * 0.18; p.oy += (ty - p.oy) * 0.18;

        luz = Math.min(1.6, luz * K) * p.vin;
        const a = Math.min(0.95, (0.13 + 0.06 * K) * p.vin + luz * 0.55);
        if (a < 0.02) continue;
        const m = Math.min(1, luz * 1.1), cyan = p.tom < 0;
        const r = Math.round(120 + ((cyan ? 34 : 167) - 120) * m);
        const g = Math.round(113 + ((cyan ? 211 : 139) - 113) * m);
        const b = Math.round(108 + ((cyan ? 238 : 250) - 108) * m);
        const sz = 1.2 + Math.min(1.4, luz * 1.1);
        ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
        ctx.fillRect(p.x + p.ox - sz / 2, p.y + p.oy - sz / 2, sz, sz);
      }
    };

    const loop = (t: number) => { desenhar(t); raf = requestAnimationFrame(loop); };
    const iniciar = () => { cancelAnimationFrame(raf); if (reduz.matches) desenhar(0); else raf = requestAnimationFrame(loop); };

    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.ativo = true; if (reduz.matches) desenhar(0); };
    const onLeave = () => { mouse.ativo = false; };
    const onDown = (e: PointerEvent) => { ondas.push({ x: e.clientX, y: e.clientY, t0: performance.now() }); if (ondas.length > 6) ondas.shift(); };
    const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else iniciar(); };

    medir(); iniciar();
    window.addEventListener('resize', medir);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVis);
    reduz.addEventListener?.('change', iniciar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', medir);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
      reduz.removeEventListener?.('change', iniciar);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 w-full h-full" />;
}
