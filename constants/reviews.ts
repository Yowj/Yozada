export interface Review {
  name: string;
  username: string;
  body: string;
  img: string;
}

export const reviews: Review[] = [
  {
    name: "Maria Santos",
    username: "@maria_s",
    body: "Best online shopping experience! Yozada delivered my order in 2 days. The quality is amazing!",
    img: "https://avatar.vercel.sh/maria",
  },
  {
    name: "Juan Dela Cruz",
    username: "@juandc",
    body: "Super affordable items at Yozada! Got my hoodie for half the price. Highly recommended!",
    img: "https://avatar.vercel.sh/juan",
  },
  {
    name: "Sarah Chen",
    username: "@sarahc",
    body: "The customer service is top-notch. Free shipping included! Will definitely shop here again.",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "Miguel Rodriguez",
    username: "@miguel_r",
    body: "Yozada has the best collection! Authentic products and super fast delivery. 5 stars!",
    img: "https://avatar.vercel.sh/miguel",
  },
  {
    name: "Andrea Lim",
    username: "@andrea_lim",
    body: "I love shopping at Yozada! Great prices, quality products, and hassle-free returns. Thank you!",
    img: "https://avatar.vercel.sh/andrea",
  },
  {
    name: "Carlo Reyes",
    username: "@carlo_r",
    body: "From shirts to accessories, Yozada has everything! Payment options are convenient too.",
    img: "https://avatar.vercel.sh/carlo",
  },
];
