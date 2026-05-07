import { About } from "@/app/_sections/About";
import { Booking } from "@/app/_sections/Booking";
import { Examples } from "@/app/_sections/Examples";
import { FAQ } from "@/app/_sections/FAQ";
import { Footer } from "@/app/_sections/Footer";
import { Hero } from "@/app/_sections/Hero";
import { HowIWork } from "@/app/_sections/HowIWork";
import { Nav } from "@/app/_sections/Nav";
import { RecentBuilds } from "@/app/_sections/RecentBuilds";
import { Services } from "@/app/_sections/Services";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Services />
        <Examples />
        <RecentBuilds />
        <HowIWork />
        <About />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
