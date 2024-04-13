import { Button } from "antd";
import { useState } from "react";

type Props = {
  color?: string;
  hoveredColor?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "link" | "dashed" | "primary" | "default" | "text";
  size?: "small" | "middle" | "large";
};
export default function ColorButton({
  color,
  hoveredColor,
  children,
  style,
  disabled,
  onClick,
  type = "default",
  loading,
  size,
}: Props) {
  const [hovered, setHovered] = useState(false);

  const isHovered = hoveredColor && hovered;

  return (
    <Button
      onClick={onClick}
      style={{
        backgroundColor: isHovered ? hoveredColor : color,
        ...style,
      }}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      type={type}
      loading={loading}
      size={size}
    >
      {children}
    </Button>
  );
}

