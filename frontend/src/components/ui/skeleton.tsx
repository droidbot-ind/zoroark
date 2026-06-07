import { cn } from "@/lib/cn";

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("skeleton", className)} {...props} />;
