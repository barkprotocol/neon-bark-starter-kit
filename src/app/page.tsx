// Components
import Hero from "./_components/hero";
import Features from "./_components/features";
import Benefits from "./_components/benefits";
import Pricing from "./_components/pricing";
import About from "./_components/about";
import Payments from "./_components/payments";
import Swap from "./_components/swap";
import FAQ from "./_components/faq";
import Blog from "./_components/blog";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <Features />
        <Benefits />
        <Pricing />
        <About />
        <Payments />
        <Swap />
        <FAQ />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
