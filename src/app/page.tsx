import { Loader } from "@/components/site/loader";
import { Nav } from "@/components/site/nav";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { About } from "@/components/site/about";
import { FocusAreas } from "@/components/site/focus-areas";
import { RepoMap } from "@/components/site/repomap";
import { Philosophy } from "@/components/site/philosophy";
import { Ecosystem } from "@/components/site/ecosystem";
import { Community } from "@/components/site/community";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col bg-[#07070a]">
      <Loader />
      <ScrollProgress />
      <Nav />

      <div className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <FocusAreas />
        <RepoMap />
        <Philosophy />
        <Ecosystem />
        <Community />
      </div>

      <Footer />
    </main>
  );
}
