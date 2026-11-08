import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pill({
  href,
  dark = true,
  className,
  children,
}: {
  href: string;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      nativeButton={false}
      render={<a href={href} />}
      variant={dark ? "default" : "outline"}
      className={cn(
        "h-[50px] rounded-full px-6 text-[17px] font-medium",
        dark ? "bg-black text-white hover:bg-black/80" : "border-black/10 bg-transparent text-black",
        className,
      )}
    >
      {children}
    </Button>
  );
}

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1428px] px-6", className)} {...props} />;
}

export function Logo({ light = false, href = "#top" }: { light?: boolean; href?: string }) {
  return (
    <a href={href} aria-label="Stone Arch, back to top" className={cn("flex items-center gap-2", light ? "text-white" : "text-black")}>
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
        <path fill="currentColor" d="M5 29V15a11 11 0 0 1 22 0v14h-6V15a5 5 0 0 0-10 0v14Z" />
        <path fill="currentColor" d="M3 29h26v2H3z" />
      </svg>
      <span className="text-[19px] font-semibold tracking-tight whitespace-nowrap">Stone Arch</span>
    </a>
  );
}
