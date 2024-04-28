import { Button } from "@nextui-org/react";
import Link from "next/link";
import { RiHome3Fill } from "react-icons/ri";
import { PROFILE_PATH } from "../path/ProfilePath";

export function ProfileButton() {
  return (
    <Button as={Link} href={PROFILE_PATH.root} isIconOnly variant="ghost">
      <RiHome3Fill className="text-xl" />
    </Button>
  );
}
