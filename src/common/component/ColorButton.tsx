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
  type?: "primary" | "default";
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
    >
      {children}
    </Button>
  );
}
