type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};
export default function SquareBox({
  children,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  return (
    <div
      style={{
        aspectRatio: "1 / 1",
        width: "100%",
        maxWidth: "25rem",
        maxHeight: "100%",
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

