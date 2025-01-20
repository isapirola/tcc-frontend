import { SvgIconProps } from "./types";

const SvgPlayIcon = ({
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
    <path d="M300.78-262.26v-435.48q0-23.22 15.96-38.11t37.04-14.89q6.7 0 14.18 1.78 7.47 1.78 14.17 5.92l342.96 218.3q11.82 7.7 18.02 19.8 6.2 12.11 6.2 24.94t-6.2 24.94q-6.2 12.1-18.02 19.8l-342.96 218.3q-6.7 4.14-14.17 5.92-7.48 1.78-14.18 1.78-21.08 0-37.04-14.89t-15.96-38.11" />
  </svg>
);
export default SvgPlayIcon;
