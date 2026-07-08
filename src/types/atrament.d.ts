declare module "atrament" {
  export type AtramentMode = "draw" | "erase" | "fill" | "disabled";

  export interface AtramentOptions {
    width?: number;
    height?: number;
    color?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fill?: any;
  }

  export default class Atrament {
    constructor(canvas: HTMLCanvasElement, options?: AtramentOptions);
    mode: AtramentMode;
    weight: number;
    color: string;
    smoothing: number;
    adaptiveStroke: boolean;
    clear(): void;
    destroy(): void;
    addEventListener(type: string, handler: (...args: unknown[]) => void): void;
  }

  export const MODE_DRAW: "draw";
  export const MODE_ERASE: "erase";
  export const MODE_FILL: "fill";
  export const MODE_DISABLED: "disabled";
}

declare module "atrament/fill" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Fill: any;
  export default Fill;
}
