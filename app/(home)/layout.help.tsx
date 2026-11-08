import { HomeShell } from "@/components/home-shell";

export default function HomeLayout({ children }: LayoutProps<"/">) {
  return <HomeShell>{children}</HomeShell>;
}
