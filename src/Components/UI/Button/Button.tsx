import "./Button.css";
import { Spinner } from "@/Components/UI/Spinner/Spinner";

type ButtonVariant = "solid" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";
type ButtonColor = "primary" | "secondary" | "danger" | "success" | "custom";

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  customColor?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  rounded?: "sm" | "md" | "lg" | "full";
  shadow?: "sm" | "md" | "lg" | "none";
  hoverEffect?: "scale" | "shine" | "underline" | "none";
}

export const Button = ({
  text,
  icon,
  iconPosition = "left",
  onClick,
  className = "",
  variant = "solid",
  size = "md",
  color = "primary",
  customColor = "#352C2B",
  fullWidth = false,
  disabled = false,
  isLoading = false,
  rounded = "full",
  shadow = "sm",
  hoverEffect = "scale",
}: ButtonProps) => {
  const buttonColor = color === "custom" ? customColor : getColorValue(color);

  return (
    <button
      className={`button 
        ${variant} 
        ${size} 
        ${color}
        ${rounded}
        ${shadow !== "none" ? `shadow-${shadow}` : ""}
        ${hoverEffect !== "none" ? `hover-${hoverEffect}` : ""}
        ${fullWidth ? "full-width" : ""} 
        ${disabled || isLoading ? "disabled" : ""} 
        ${isLoading ? "loading" : ""}
        ${iconPosition === "right" ? "icon-right" : ""}
        ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={
        {
          "--button-color": buttonColor,
          "--button-text-color": getTextColor(buttonColor, variant),
        } as React.CSSProperties
      }
      aria-disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Spinner
          size={size === "lg" ? "md" : "sm"}
          color={variant === "solid" ? "light" : "primary"}
        />
      ) : (
        <>
          {icon && <span className="button__icon">{icon}</span>}
          {text && <span className="button__text">{text}</span>}
        </>
      )}
    </button>
  );
};

// Вспомогательные функции остаются без изменений
function getColorValue(color: Exclude<ButtonColor, "custom">): string {
  const colors = {
    primary: "#352C2B",
    secondary: "#E7392F",
    danger: "#DC2626",
    success: "#16A34A",
  };
  return colors[color];
}

function getTextColor(bgColor: string, variant: ButtonVariant): string {
  if (variant === "solid") {
    return getContrastColor(bgColor);
  }
  return bgColor;
}

function getContrastColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
}
