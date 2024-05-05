import { Button } from "@nextui-org/react";
import { FiTrash } from "react-icons/fi";
import { DEFAULT_MESSAGE_KR } from "../../message/Default.message";

type Props = {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
};

export function DeleteItemButton({ onClick, size = "sm" }: Props) {
  return (
    <Button size={size} onClick={onClick}>
      <FiTrash />
      {DEFAULT_MESSAGE_KR.button.delete}
    </Button>
  );
}
