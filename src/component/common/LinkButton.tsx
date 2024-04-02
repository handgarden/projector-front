import { Button } from "antd";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  children: React.ReactNode;
  type?: "primary" | "default";
  loading?: boolean;
};

export default function LinkButton({
  to,
  children,
  type = "default",
  loading,
}: Props) {
  return (
    <Link to={to}>
      <Button type={type} loading={loading}>
        {children}
      </Button>
    </Link>
  );
}
