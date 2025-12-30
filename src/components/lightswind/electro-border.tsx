import React, { CSSProperties, PropsWithChildren, useEffect, useId, useLayoutEffect, useRef } from "react";

/* -----------------------------
   🔧 Utility: HEX → RGBA
------------------------------ */
const toRGBA = (hex: string, alpha = 1): string => {
  try {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return `rgba(0,0,0,${alpha})`;
    ctx.fillStyle = hex;
    const c = ctx.fillStyle;
    if (c.startsWith("rgb(")) return c.replace("rgb(", "rgba(").replace(")", `,${alpha})`);
    if (c.startsWith("rgba(")) return c.replace(/[\d.]+\)$/g, `${alpha})`);
    return c;
  } catch {
    return `rgba(0,0,0,${alpha})`;
  }
};

/* -----------------------------
   ⚙️ Props
------------------------------ */
export interface ElectroBorderProps extends PropsWithChildren {
  borderColor?: string;
  borderWidth?: number;
  radius?: number | string;

  distortion?: number;
  animationSpeed?: number;

  glow?: boolean;
  aura?: boolean;
  effects?: boolean;
  glowBlur?: number;

  className?: string;
  style?: CSSProperties;
}

/* -----------------------------
   ⚡ ElectroBorder
------------------------------ */
const ElectroBorder: React.FC<ElectroBorderProps> = ({
  children,
  borderColor = "#bdd7fa",
  borderWidth = 2,
  radius = 12,

  distortion = 1,
  animationSpeed = 1,

  glow = true,
  aura = true,
  effects = true,
  glowBlur = 28,

  className,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const strokeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const id = useId().replace(/:/g, "");
  const filterId = `electro-filter-${id}`;

  const updateFilter = () => {
    if (!rootRef.current || !svgRef.current || !strokeRef.current) return;
    const { width, height } = rootRef.current.getBoundingClientRect();

    strokeRef.current.style.filter = `url(#${filterId})`;

    const svg = svgRef.current;
    const disp = svg.querySelector("feDisplacementMap");
    if (disp) disp.setAttribute("scale", `${distortion * 30}`);

    const anims = svg.querySelectorAll<SVGAnimateElement>("animate");
    anims.forEach((a, i) => {
      a.setAttribute("dur", `${Math.max(0.01, 6 / animationSpeed)}s`);
      a.setAttribute("values", i % 2 === 0 ? `${width};0` : `0;-${height}`);
    });
  };

  useLayoutEffect(() => {
    updateFilter();
    const observer = new ResizeObserver(updateFilter);
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(updateFilter, [distortion, animationSpeed]);

  const radiusStyle: CSSProperties = { borderRadius: radius };

  /* Wrapper centrato */
  const wrapperStyle: CSSProperties = {
    ...radiusStyle,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    isolation: "isolate",
    ...style,
  };

  const contentStyle: CSSProperties = {
    ...radiusStyle,
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column", // utile per skills + tools
    gap: "0.5rem",
  };

  const borderStyle: CSSProperties = {
    ...radiusStyle,
    border: `${borderWidth}px solid ${borderColor}`,
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 10,
  };

  const glow1: CSSProperties =
    effects && glow
      ? {
          ...radiusStyle,
          border: `${borderWidth}px solid ${toRGBA(borderColor, 0.6)}`,
          filter: `blur(${borderWidth * 1.2}px)`,
          opacity: 0.15,
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 5,
        }
      : {};

  const glow2: CSSProperties =
    effects && glow
      ? {
          ...radiusStyle,
          border: `${borderWidth}px solid ${toRGBA(borderColor, 0.9)}`,
          filter: `blur(${glowBlur}px)`,
          opacity: 0.45,
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 6,
        }
      : {};

  const auraStyle: CSSProperties =
    effects && aura
      ? {
          ...radiusStyle,
          position: "absolute",
          inset: 0,
          transform: "scale(1.08)",
          background: `radial-gradient(circle, ${toRGBA(borderColor, 0.5)} 0%, transparent 70%)`,
          filter: `blur(${glowBlur * 1.3}px)`,
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
        }
      : {};

  return (
    <div ref={rootRef} className={className} style={wrapperStyle}>
      {/* SVG Filter */}
      <svg ref={svgRef} width="0" height="0" aria-hidden>
        <defs>
          <filter id={filterId} x="-200%" y="-200%" width="500%" height="500%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="6" seed="2" />
            <feOffset dx="0" dy="0">
              <animate attributeName="dx" values="0;-500" repeatCount="indefinite" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="6" seed="8" />
            <feOffset dx="0" dy="0">
              <animate attributeName="dy" values="500;0" repeatCount="indefinite" />
            </feOffset>
            <feBlend mode="lighten" />
            <feDisplacementMap in="SourceGraphic" scale="30" />
          </filter>
        </defs>
      </svg>

      {/* Effects */}
      <div>
        <div ref={strokeRef} style={borderStyle} />
        {effects && glow && <div style={glow1} />}
        {effects && glow && <div style={glow2} />}
        {effects && aura && <div style={auraStyle} />}
      </div>

      {/* Content */}
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default ElectroBorder;
