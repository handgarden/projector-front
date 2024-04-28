import { Button } from "@nextui-org/react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { PROFILE_PATH } from "../path/ProfilePath";

export function ProfileButton() {
  return (
    <Button as={Link} href={PROFILE_PATH.root} isIconOnly variant="ghost">
      <CgProfile className="text-xl" />
    </Button>
  );
}
