import { Truck, Shield, RotateCcw, CreditCard } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Multiple payment options",
  },
];

export function BenefitsSection() {
  return (
    <section className="w-full border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-4"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 md:mb-0 md:shrink-0">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
