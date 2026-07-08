"use client";

import { useEffect, useRef, useState } from "react";
import { useHorizontal } from "@/components/horizontal";
import { PanelShownContext } from "@/components/horizontal/PanelShown";
import { GhostText, Sticker } from "@/components/zine";
import { cn } from "@/lib/utils";

type Tool = "draw" | "spray" | "fill" | "erase";

const TOOLS: { id: Tool; label: string; dot: string }[] = [
  { id: "draw", label: "Pencil", dot: "bg-sage" },
  { id: "spray", label: "Spray", dot: "bg-butter" },
  { id: "fill", label: "Fill", dot: "bg-coral" },
  { id: "erase", label: "Eraser", dot: "bg-sky" },
];

const SIZES = [4, 10, 20, 34];

const PALETTE = [
  "#faf5ec",
  "#1f1d1a",
  "#2f6df0",
  "#e4572e",
  "#3f7a5e",
  "#f2b63c",
  "#4a7ba6",
  "#f0c9b8",
  "#ffffff",
  "#ff2e2e",
  "#00c853",
  "#2979ff",
  "#ffd600",
  "#d500f9",
  "#00e5ff",
  "#ff6d00",
  "#e91e63",
  "#795548",
  "#9e9e9e",
  "#c53b3a",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AtramentInstance = any;

export default function DrawPanel({ index }: { index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const atramentRef = useRef<AtramentInstance | null>(null);
  const ratioRef = useRef(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modulesRef = useRef<{ Atrament: any; Fill: any } | null>(null);

  const { setActivePanel } = useHorizontal();
  const [tool, setTool] = useState<Tool>("draw");
  const [color, setColor] = useState("#faf5ec");
  const [weight, setWeight] = useState(10);
  const [ready, setReady] = useState(false);
  const [shown, setShown] = useState(false);

  const toolRef = useRef(tool);
  const colorRef = useRef(color);
  const weightRef = useRef(weight);
  toolRef.current = tool;
  colorRef.current = color;
  weightRef.current = weight;

  // Reveal + report as active panel when the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            setShown(true);
            setActivePanel({ index, label: "draw" });
          }
        });
      },
      { threshold: [0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, setActivePanel]);

  // ---- init / (re)size atrament ----
  useEffect(() => {
    let disposed = false;

    const build = async () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      if (!modulesRef.current) {
        const [atramentMod, fillMod] = await Promise.all([
          import("atrament"),
          import("atrament/fill"),
        ]);
        modulesRef.current = { Atrament: atramentMod.default, Fill: fillMod.default };
      }
      if (disposed) return;

      const { Atrament, Fill } = modulesRef.current;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));

      atramentRef.current?.destroy?.();
      const at = new Atrament(canvas, { width: w, height: h, color: colorRef.current, fill: Fill });
      at.smoothing = 0.8;
      at.weight = weightRef.current * dpr;
      at.mode = toolRef.current === "spray" ? "disabled" : toolRef.current;
      atramentRef.current = at;
      ratioRef.current = dpr;
      setReady(true);
    };

    build();

    // Rebuild on meaningful resize (clears the board)
    let raf = 0;
    let last = "";
    const ro = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box) return;
      const key = `${Math.round(box.width)}x${Math.round(box.height)}`;
      if (key === last) return;
      last = key;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => build());
    });
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      atramentRef.current?.destroy?.();
      atramentRef.current = null;
    };
  }, []);

  // ---- react to tool / color / weight ----
  useEffect(() => {
    const at = atramentRef.current;
    if (!at) return;
    at.mode = tool === "spray" ? "disabled" : tool;
  }, [tool, ready]);

  useEffect(() => {
    const at = atramentRef.current;
    if (at) at.color = color;
  }, [color, ready]);

  useEffect(() => {
    const at = atramentRef.current;
    if (at) at.weight = weight * ratioRef.current;
  }, [weight, ready]);

  // ---- custom Spray tool (atrament is disabled in this mode) ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || tool !== "spray") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let spraying = false;
    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const toCanvas = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const sx = canvas.width / rect.width;
      const sy = canvas.height / rect.height;
      return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy };
    };

    const spray = () => {
      const radius = weightRef.current * ratioRef.current * 1.6;
      const dots = Math.round(radius * 0.9);
      ctx.fillStyle = colorRef.current;
      for (let i = 0; i < dots; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * radius;
        const dx = Math.cos(a) * r;
        const dy = Math.sin(a) * r;
        ctx.beginPath();
        ctx.arc(lastX + dx, lastY + dy, ratioRef.current * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!spraying) return;
      spray();
      frame = requestAnimationFrame(loop);
    };

    const down = (e: PointerEvent) => {
      e.preventDefault();
      spraying = true;
      const p = toCanvas(e);
      lastX = p.x;
      lastY = p.y;
      spray();
      frame = requestAnimationFrame(loop);
      canvas.setPointerCapture?.(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!spraying) return;
      const p = toCanvas(e);
      lastX = p.x;
      lastY = p.y;
    };
    const up = () => {
      spraying = false;
      cancelAnimationFrame(frame);
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      cancelAnimationFrame(frame);
    };
  }, [tool]);

  const reset = () => atramentRef.current?.clear?.();

  return (
    <PanelShownContext.Provider value={shown}>
      <section
        ref={sectionRef}
        id="draw"
        className="relative min-h-screen w-full overflow-hidden bg-ink text-cream lg:h-screen"
      >
        <GhostText
          tone="cream"
          className="absolute right-6 top-[4%] text-[24vw] opacity-[0.06] lg:text-[16vw]"
        >
          DRAW
        </GhostText>

        {/* Full-bleed canvas board */}
        <div ref={containerRef} className="absolute inset-0">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ cursor: tool === "fill" ? "cell" : "crosshair", touchAction: "none" }}
          />
        </div>

        {/* Heading / hint */}
        <div className="pointer-events-none absolute left-1/2 top-[10%] z-30 hidden -translate-x-1/2 flex-col items-center gap-3 text-center lg:flex">
          <Sticker tone="cobalt" rotate={-2} className="pointer-events-auto">
            {"// scratchpad"}
          </Sticker>
          <p className="font-grotesk text-sm font-medium text-cream/60">
            the last commit is yours — <span className="text-cobalt">drag to draw.</span>
          </p>
        </div>

        {/* Toolbar */}
        <div className="absolute left-6 top-24 z-30 flex items-start gap-2.5 lg:left-10 lg:top-28">
          {/* Tools + sizes */}
          <div className="flex flex-col gap-1.5 rounded-xl border-2 border-ink bg-cream p-2.5 shadow-hard-lg">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border-2 border-ink px-2.5 py-1 font-grotesk text-[11px] font-bold uppercase tracking-[0.06em] shadow-hard transition-transform hover:-translate-y-0.5",
                  tool === t.id ? "bg-cobalt text-cream" : "bg-paper text-ink"
                )}
              >
                <span className={cn("h-2 w-2 rounded-full border border-ink", t.dot)} />
                {t.label}
              </button>
            ))}
            <button
              onClick={reset}
              className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-coral px-2.5 py-1 font-grotesk text-[11px] font-bold uppercase tracking-[0.06em] text-cream shadow-hard transition-transform hover:-translate-y-0.5"
            >
              <span className="h-2 w-2 rounded-full border border-cream/60 bg-cream/30" />
              Reset
            </button>

            {/* Brush sizes */}
            <div className="mt-0.5 flex items-center justify-around gap-1 border-t-2 border-dashed border-ink/20 pt-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setWeight(s)}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors",
                    weight === s ? "border-cobalt bg-cobalt/10" : "border-ink/20 hover:border-ink"
                  )}
                  aria-label={`Brush size ${s}`}
                >
                  <span
                    className="rounded-full bg-ink"
                    style={{ width: Math.max(3, s / 2.6), height: Math.max(3, s / 2.6) }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Palette */}
          <div className="grid grid-cols-2 gap-1 rounded-xl border-2 border-ink bg-cream p-2.5 shadow-hard-lg">
            {PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                aria-label={`Colour ${c}`}
                style={{ backgroundColor: c }}
                className={cn(
                  "h-5 w-5 rounded-full border-2 transition-transform hover:scale-110",
                  color === c
                    ? "border-cobalt ring-2 ring-cobalt ring-offset-1 ring-offset-cream"
                    : "border-ink"
                )}
              />
            ))}
          </div>
        </div>
      </section>
    </PanelShownContext.Provider>
  );
}
