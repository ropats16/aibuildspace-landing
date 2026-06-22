import { Footer } from "@/app/_sections/Footer";
import { Nav } from "@/app/_sections/Nav";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
