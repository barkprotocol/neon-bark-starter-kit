import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCartIcon, StoreIcon, GlobeIcon, CreditCardIcon, ShieldIcon, PuzzleIcon } from "lucide-react";

const useCases = [
  {
    title: "Online Retail",
    description:
      "Optimize your online store with seamless payment processing, supporting various payment methods to enhance the shopping experience.",
    icon: <ShoppingCartIcon className="h-12 w-12 text-primary" />,
  },
  {
    title: "Subscription Services",
    description:
      "Manage recurring payments effortlessly with automated billing and subscription management features, ensuring a smooth user experience.",
    icon: <CreditCardIcon className="h-12 w-12 text-primary" />,
  },
  {
    title: "Global E-Commerce",
    description:
      "Reach international customers by accepting multiple currencies and payment methods, ensuring a global reach for your business.",
    icon: <GlobeIcon className="h-12 w-12 text-primary" />,
  },
  {
    title: "In-Store Payments",
    description:
      "Integrate with POS systems to facilitate quick and secure in-store transactions, bridging the gap between online and offline sales.",
    icon: <StoreIcon className="h-12 w-12 text-primary" />,
  },
];

const paymentFeatures = [
  {
    title: "Multi-Currency Support",
    description:
      "Handle transactions in various currencies, providing a localized experience for international customers.",
    icon: <GlobeIcon className="h-12 w-12 text-primary" />,
  },
  {
    title: "Real-Time Notifications",
    description:
      "Receive instant notifications on payment activities to stay updated on transaction statuses and potential issues.",
    icon: <CreditCardIcon className="h-12 w-12 text-primary" />,
  },
  {
    title: "Fraud Detection",
    description:
      "Advanced fraud detection mechanisms to protect against unauthorized transactions and ensure secure payments.",
    icon: <ShieldIcon className="h-12 w-12 text-primary" />,
  },
  {
    title: "Seamless Integrations",
    description:
      "Integrate with major e-commerce platforms and payment gateways effortlessly, expanding your payment capabilities.",
    icon: <PuzzleIcon className="h-12 w-12 text-primary" />,
  },
];

export default function UseCasesAndPayments() {
  return (
    <section id="use-cases" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Use Cases & Payment Features
          </h2>
          <p className="mt-4 text-muted-foreground">
            Discover how BARK Payments can enhance various business scenarios with advanced payment features and seamless e-commerce integrations.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold mb-6">Use Cases</h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {useCases.map((useCase) => (
                <Card
                  key={useCase.title}
                  className="transition-transform transform hover:scale-105 duration-300 ease-in-out hover:border-primary"
                >
                  <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                    {useCase.icon}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{useCase.title}</h3>
                    <p className="text-muted-foreground text-center">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Payment Features</h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {paymentFeatures.map((feature) => (
                <Card
                  key={feature.title}
                  className="transition-transform transform hover:scale-105 duration-300 ease-in-out hover:border-primary"
                >
                  <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                    {feature.icon}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{feature.title}</h3>
                    <p className="text-muted-foreground text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
