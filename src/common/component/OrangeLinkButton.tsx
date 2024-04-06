import LinkButton from "./LinkButton";

type Props = {
  to: string | -1;
  children: React.ReactNode;
  type?: "primary" | "default";
  loading?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
};

export default function OrangeLinkButton({
  to,
  children,
  type = "default",
  loading,
  style,
  disabled,
}: Props) {
  return (
    <LinkButton
      to={to as string}
      disabled={disabled}
      style={{ ...style }}
      type={type}
      color="#ff9d1a"
      hoveredColor="rgb(255 181 81)"
      loading={loading}
    >
      {children}
    </LinkButton>
  );
}
