import { GitHubAccountLinkButton } from "./GitHubAccountLinkButton";
import { GitHubAccountUnlinkButton } from "./GitHubAccountUnlinkButton";

type GitHubOAuthButtonProps = {
  isLinked: boolean;
};

export function GitHubOAuthButton({ isLinked }: GitHubOAuthButtonProps) {
  if (isLinked) {
    return <GitHubAccountUnlinkButton />;
  }
  return <GitHubAccountLinkButton />;
}
