import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Shield, Headphones, CreditCard } from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Truck className="h-8 w-8" />,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    id: 2,
    icon: <Shield className="h-8 w-8" />,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    id: 3,
    icon: <Headphones className="h-8 w-8" />,
    title: "24/7 Support",
    description: "Dedicated support team",
  },
  {
    id: 4,
    icon: <CreditCard className="h-8 w-8" />,
    title: "Easy Returns",
    description: "30-day return policy",
  },
];

export function PromotionalBanners() {
  return (
    <>
      {/* Features Section */}
      <section className="w-full bg-muted/30 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-1 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Promotional Banners */}
      <section className="w-full px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Banner 1 */}
            <Link href="/products" className="group">
              <Card className="overflow-hidden border-0 transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="relative h-[300px] bg-gradient-to-br from-indigo-500 to-purple-600">
                  <div className="flex h-full flex-col items-start justify-center p-8 text-white">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide">
                      Limited Time Offer
                    </p>
                    <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                      Up to 40% Off
                    </h3>
                    <p className="mb-6 text-lg opacity-90">
                      Selected items on sale now
                    </p>
                    <Button
                      variant="secondary"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                    >
                      Shop Sale
                    </Button>
                  </div>
                  <div className="absolute bottom-0 right-0 opacity-20">
                    <svg
                      width="200"
                      height="200"
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="100" cy="100" r="80" fill="white" />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Banner 2 */}
            <Link href="/products" className="group">
              <Card className="overflow-hidden border-0 transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="relative h-[300px] bg-gradient-to-br from-emerald-500 to-teal-600">
                  <div className="flex h-full flex-col items-start justify-center p-8 text-white">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide">
                      New Collection
                    </p>
                    <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                      Fresh Arrivals
                    </h3>
                    <p className="mb-6 text-lg opacity-90">
                      Explore the latest trends
                    </p>
                    <Button
                      variant="secondary"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                    >
                      Discover Now
                    </Button>
                  </div>
                  <div className="absolute bottom-0 right-0 opacity-20">
                    <svg
                      width="200"
                      height="200"
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="50"
                        y="50"
                        width="100"
                        height="100"
                        rx="10"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
