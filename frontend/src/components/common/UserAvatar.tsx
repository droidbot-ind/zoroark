import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";

const AVATAR_BG = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-pink-500",
];

const getColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_BG[Math.abs(hash) % AVATAR_BG.length];
};

const getInitials = (name: string) => name.slice(0, 2).toUpperCase();

interface UserAvatarProps {
  avatarUrl?: string | null;
  displayName?: string | null;
  username: string;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  avatarUrl,
  displayName,
  username,
  className,
}) => {
  const name = displayName?.trim() || username;
  const color = getColor(name);

  return (
    <Avatar className={className}>
      <AvatarImage src={avatarUrl ?? undefined} />
      <AvatarFallback className={cn(color, "text-white")}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};
