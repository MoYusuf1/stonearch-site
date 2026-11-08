import { Container, Logo } from "@/components/site";
import { BRAND } from "@/lib/leads";

// Header and footer for the homeowner help site: nothing about websites, no studio links.
export function HomeShell({ children, cta = true }: { children: React.ReactNode; cta?: boolean }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
        <Container className="flex h-16 items-center justify-between">
          <Logo href={`${process.env.NEXT_PUBLIC_BASE_PATH}/`} />
          {cta && (
            <a href="#get-help" className="rounded-full bg-black px-4 py-2 text-[15px] font-medium text-white hover:bg-black/80">
              Get help
            </a>
          )}
        </Container>
      </header>
      <main>{children}</main>
      <footer className="mt-24 border-t border-black/10">
        <Container className="py-10 text-[13px] text-black/60">
          &copy; 2026 {BRAND} &middot; Minneapolis&ndash;St. Paul
        </Container>
      </footer>
    </>
  );
}
