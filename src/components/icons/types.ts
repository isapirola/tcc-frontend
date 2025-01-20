import { SVGProps } from "react";

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  color?: string;
}
