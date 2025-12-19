import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Marquee } from "./ui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
    text: "Absolutely love the quality! The products arrived faster than expected and exceeded my expectations.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    rating: 5,
    text: "Best online shopping experience I've had. The customer service team was incredibly helpful.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    rating: 5,
    text: "Premium quality products at great prices. I've already recommended Yozada to all my friends!",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    rating: 5,
    text: "The attention to detail is impressive. Every item I've purchased has been perfect.",
  },
  {
    id: 5,
    name: "Amanda Lee",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
    rating: 5,
    text: "Fast shipping, great packaging, and amazing products. What more could you ask for?",
  },
  {
    id: 6,
    name: "David Brown",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    rating: 5,
    text: "I'm a repeat customer and have never been disappointed. Yozada is my go-to shop!",
  },
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

function TestimonialCard({
  name,
  role,
  avatar,
  rating,
  text,
}: {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}) {
  return (
    <Card
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden p-6 transition-all duration-300 hover:shadow-lg",
        "border bg-card"
      )}
    >
      <Quote className="absolute right-4 top-4 h-8 w-8 text-muted-foreground/20" />
      <div className="mb-4 flex items-center gap-3">
        <Image
          src={avatar}
          alt={name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full bg-muted"
          unoptimized
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <div className="mb-3 flex gap-0.5">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{text}</p>
    </Card>
  );
}

export function TestimonialsSection() {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Loved by Thousands
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            See what our customers are saying about their shopping experience
          </p>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstRow.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {secondRow.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
