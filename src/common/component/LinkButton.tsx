import { Link } from "react-router-dom";
import ColorButton from "./ColorButton";

type Props = {
  to: string;
  children: React.ReactNode;
  type?: "link" | "dashed" | "primary" | "default" | "text";
  loading?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  color?: string;
  hoveredColor?: string;
  size?: "small" | "middle" | "large";
};

export default function LinkButton({
  to,
  children,
  type = "default",
  loading,
  style,
  disabled,
  color,
  hoveredColor,
  size,
}: Props) {
  return (
    <Link
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ColorButton
        type={type}
        color={color}
        hoveredColor={hoveredColor}
        loading={loading}
        style={{
          ...style,
        }}
        disabled={disabled}
        size={size}
      >
        {children}
      </ColorButton>
    </Link>
  );
}

