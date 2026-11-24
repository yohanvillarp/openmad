
export interface NodeShapeProps {
  className?: string;
  fill: string;
  stroke: string;
  strokeWidth: string | number;
}

export const NodeShapes = {
  ruta: ({ className, fill, stroke, strokeWidth }: NodeShapeProps) => (
    <svg viewBox="0 0 100 100" className={className}>
      <polygon points="50,10 90,50 50,90 10,50" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  ),
  modulo: ({ className, fill, stroke, strokeWidth }: NodeShapeProps) => (
    <svg viewBox="0 0 100 100" className={className}>
      <rect x="15" y="15" width="70" height="70" rx="14" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  ),
  paso: ({ className, fill, stroke, strokeWidth }: NodeShapeProps) => (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="35" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  ),
  hito: ({ className, fill, stroke, strokeWidth }: NodeShapeProps) => (
    <svg viewBox="0 0 100 100" className={className}>
      <polygon points="50,12 83,31 83,69 50,88 17,69 17,31" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  ),
};
