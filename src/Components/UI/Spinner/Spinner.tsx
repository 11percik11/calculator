import "./Spinner.css";

type SpinnerSize = "sm" | "md" | "lg";
type SpinnerColor = "light" | "dark" | "primary" | "current";

interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
}

export const Spinner = ({
  size = "md",
  color = "current",
  className = "",
}: SpinnerProps) => {
  return (
    <div
      className={`spinner ${size} ${color} ${className}`}
      aria-label="Loading"
    />
  );
};
