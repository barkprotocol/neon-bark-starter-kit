import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-foreground py-20 text-primary-foreground">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 md:px-6 lg:flex-row lg:gap-12">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Revolutionize Payments with BARK
          </h1>
          <p className="mt-4 text-lg">
            BARK Payments combines BARK with USDC and SOL on the Solana blockchain to deliver fast, secure, and cost-effective transactions. Discover a new standard in payment processing with unparalleled integration and robust security features.
          </p>
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:gap-6 lg:justify-start">
            <Link href="/auth/signin" passHref>
              <Button className="w-full lg:w-auto" variant="primary">
                Get Started
              </Button>
            </Link>
            <Link href="#learn-more" passHref>
              <Button className="w-full lg:w-auto" variant="secondary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative h-[400px] w-full max-w-[750px] rounded-xl bg-black/80 overflow-hidden">
          <img
            src="/public/images/payments.png"
            alt="USDC, BARK and SOL"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
