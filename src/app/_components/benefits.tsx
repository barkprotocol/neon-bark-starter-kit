import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon, MoneyIcon } from "lucide-react";
import AnimatedBeamMultipleOutputDemo from "@/components/example/animated-beam-multiple-outputs";
import AnimatedListDemo from "@/components/example/animated-list-demo";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Marquee from "@/components/magicui/marquee";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const paymentFiles = [
  {
    name: "transaction-report.pdf",
    body: "Comprehensive report of all transactions, including date, amount, and status for detailed financial analysis.",
  },
  {
    name: "payment-invoice.xlsx",
    body: "Invoice spreadsheets with sortable and filterable payment details for easy record-keeping and management.",
  },
  {
    name: "receipt.svg",
    body: "PDF format receipt for clear and accessible documentation of payment confirmations.",
  },
  {
    name: "refunds.gpg",
    body: "Encrypted file containing information about refunds issued, ensuring secure handling of sensitive data.",
  },
  {
    name: "payment-logs.txt",
    body: "Log of all payment activities, useful for debugging, auditing, and compliance checks.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Comprehensive Payment Management",
    description: "Efficiently manage and review all payment-related documents, including transaction reports and invoices.",
    href: "#",
    cta: "Explore Features",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {paymentFiles.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Real-Time Payment Notifications",
    description: "Receive instant notifications for all payment-related activities, ensuring you stay updated on every transaction.",
    href: "#",
    cta: "See It In Action",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Seamless Integrations",
    description: "Integrate effortlessly with popular payment systems, including USDC and Solana blockchain, for a versatile payment experience.",
    href: "#",
    cta: "Learn More",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Transaction Calendar",
    description: "Utilize our calendar tool to filter and view transactions by specific dates, making it easier to track and manage payments.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Explore Calendar",
    background: (
      <Calendar
        mode="single"
        selected={new Date()}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="bg-muted py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Benefits</h2>
          <p className="mt-4 text-muted-foreground">
            Discover the powerful features and integrations that enhance your payment processing experience, including support for USDC and Solana.
          </p>
        </div>
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
