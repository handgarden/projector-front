import { Link } from "react-router-dom";
import ColorButton from "./ColorButton";

type Props = {
  to: string;
  children: React.ReactNode;
  type?: "primary" | "default";
  loading?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  color?: string;
  hoveredColor?: string;
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
}: Props) {
  return (
    <Link to={to}>
      <ColorButton
        type={type}
        color={color}
        hoveredColor={hoveredColor}
        loading={loading}
        style={{ ...style }}
        disabled={disabled}
      >
        {children}
      </ColorButton>
    </Link>
  );
}
