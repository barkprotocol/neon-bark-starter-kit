"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Home",
    href: "/",
    description:
      "Explore the main features and benefits of BARK Payments, designed to streamline your payment processing.",
  },
  {
    title: "Features",
    href: "/features",
    description:
      "Discover key features including integration options, security measures, and customizable payment solutions.",
  },
  {
    title: "Use Cases",
    href: "/use-cases",
    description:
      "Learn how BARK Payments can be used in real-world scenarios like e-commerce, subscription services, and international transactions.",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Read the latest updates, tips, and insights from the BARK Payments team.",
  },
  {
    title: "About",
    href: "/about",
    description:
      "Learn more about BARK Payments, our mission, and the team behind the platform.",
  },
  {
    title: "FAQ",
    href: "/faq",
    description:
      "Find answers to common questions about BARK Payments, including setup, features, and troubleshooting.",
  },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image
            src="/icon.png"
            width={40}
            height={40}
            alt="BARK Payments Logo"
            className="rounded-full"
          />
          <span className="font-bold text-primary">BARK Payments</span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/getting-started"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          BARK Payments Overview
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Get a comprehensive introduction to BARK Payments and how it can enhance your payment processing.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs/installation" title="Installation">
                    Detailed steps to integrate BARK Payments into your system, including prerequisites and configuration.
                  </ListItem>
                  <ListItem href="/docs/features" title="Features">
                    In-depth look at the features available, from transaction management to security options.
                  </ListItem>
                  <ListItem href="/docs/use-cases" title="Use Cases">
                    Real-world examples of how BARK Payments is utilized in various industries and applications.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Link href="/auth/signin" className="btn btn-primary">
          <Button variant="outline">Get Started</Button>
        </Link>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
