import { SvgIconProps } from "./types";

const SvgStopIcon = ({
  width = 24,
  height = 24,
  color = "var(--w)",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={color}
    viewBox="0 -960 960 960"
    {...props}>
    <path d="M220.78-326.78v-306.44q0-44.3 30.85-75.15t75.15-30.85h306.44q44.3 0 75.15 30.85t30.85 75.15v306.44q0 44.3-30.85 75.15t-75.15 30.85H326.78q-44.3 0-75.15-30.85t-30.85-75.15" />
  </svg>
);
export default SvgStopIcon;
