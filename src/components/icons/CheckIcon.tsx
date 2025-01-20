import { SvgIconProps } from "./types";

const SvgCheckIcon = ({
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
    <path d="m382-373.22 328.83-328.82Q726.78-718 748.43-718q21.66 0 37.61 15.96Q802-686.09 802-664.22t-15.96 37.83L419.61-259.52q-15.96 15.96-37.61 15.96t-37.61-15.96L173.52-430.39q-15.96-15.96-15.74-37.83t16.18-37.82Q189.91-522 211.78-522t37.83 15.96z" />
  </svg>
);
export default SvgCheckIcon;
