import { SvgIconProps } from "./types";

const SvgPauseIcon = ({
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
    <path d="M656.95-165.52q-43.73 0-74.86-31.14t-31.13-74.86v-416.96q0-43.72 31.14-74.86t74.87-31.14 74.86 31.14 31.13 74.86v416.96q0 43.72-31.14 74.86t-74.87 31.14m-353.92 0q-43.73 0-74.86-31.14t-31.13-74.86v-416.96q0-43.72 31.14-74.86t74.87-31.14 74.86 31.14 31.13 74.86v416.96q0 43.72-31.14 74.86t-74.87 31.14" />
  </svg>
);
export default SvgPauseIcon;
