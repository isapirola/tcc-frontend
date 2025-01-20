import { SvgIconProps } from "./types";

const SvgAddIcon = ({
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
    <path d="M427-427H233.78q-22.08 0-37.54-15.46-15.46-15.45-15.46-37.54t15.46-37.54Q211.7-533 233.78-533H427v-193.22q0-22.08 15.46-37.54 15.45-15.46 37.54-15.46t37.54 15.46Q533-748.3 533-726.22V-533h193.22q22.08 0 37.54 15.46 15.46 15.45 15.46 37.54t-15.46 37.54Q748.3-427 726.22-427H533v193.22q0 22.08-15.46 37.54-15.45 15.46-37.54 15.46t-37.54-15.46Q427-211.7 427-233.78z" />
  </svg>
);
export default SvgAddIcon;
