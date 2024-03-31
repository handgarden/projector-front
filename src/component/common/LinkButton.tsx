import { Button } from "antd";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  children: React.ReactNode;
};

export default function LinkButton({ to, children }: Props) {
  return (
    <Link to={to}>
      <Button>{children}</Button>
    </Link>
  );
}
