import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#f7f7f7] dark:bg-[#221506]", className)}
      {...props}
    />
  );
}

export { Skeleton };
