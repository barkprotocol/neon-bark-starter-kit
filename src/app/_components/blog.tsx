import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  image: string; // URL or path to the image
}

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    title: "The Future of Payment Processing",
    excerpt: "Discover the upcoming trends and technologies shaping the future of payment processing. From blockchain innovations to AI-driven fraud detection, stay ahead with our insights.",
    slug: "future-of-payment-processing",
    date: "August 15, 2024",
    image: "/images/future-of-payment-processing.jpg", // Replace with actual path
  },
  {
    title: "How BARK Payments Simplifies Transactions",
    excerpt: "Learn how BARK Payments is transforming payment processing with its seamless integration and advanced features. Understand the benefits and see real-world applications.",
    slug: "how-bark-simplifies-transactions",
    date: "August 22, 2024",
    image: "/images/bark-simplifies-transactions.jpg", // Replace with actual path
  },
  {
    title: "Top 5 Security Tips for Online Payments",
    excerpt: "Ensure your transactions are safe with our top 5 security tips. Learn how to protect your business and customers from fraud and cyber threats.",
    slug: "top-5-security-tips",
    date: "August 30, 2024",
    image: "/images/security-tips.jpg", // Replace with actual path
  },
  {
    title: "Getting Started with BARK Payments",
    excerpt: "A step-by-step guide to integrating BARK Payments into your platform. Get tips on setup, configuration, and best practices for a smooth implementation.",
    slug: "getting-started-with-bark",
    date: "September 5, 2024",
    image: "/images/getting-started-with-bark.jpg", // Replace with actual path
  },
];

export default function Blog() {
  return (
    <section className={cn('p-6 bg-background')}>
      <div className="container mx-auto max-w-3xl">
        <h2 className={cn('text-3xl font-bold mb-6 text-primary')}>Blog</h2>
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article key={post.slug} className="p-4 border rounded-lg bg-card shadow-sm">
              <div className="relative mb-4 h-[200px] w-full rounded-lg overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className={cn('text-2xl font-semibold mb-2')}>
                <Link href={`/blog/${post.slug}`} passHref>
                  <a className="text-primary hover:underline">{post.title}</a>
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
              <p className="text-lg mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} passHref>
                <a className="text-primary hover:underline">Read more</a>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
