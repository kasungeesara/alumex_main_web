/** Add product entries here; /products/[slug] renders the shared layout. */
export type ProductImage = { src: string; alt: string };
export type ProductDetail = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  seoDescription?: string;
  gallery: [ProductImage, ProductImage, ProductImage, ProductImage];
  paragraphs: string[];
  specifications: { title: string; items: string[]; description?: string }[];
  specificationsImage: ProductImage;
  benefits: string[];
  benefitsImage: ProductImage;
  /** A local PDF path or a public download URL; omit to offer an email request. */
  catalogueUrl?: string;
};

export const productDetails: ProductDetail[] = [
  {
    slug: "slenderline",
    name: "SlenderLine",
    headline: "Ultra-Slim\nAluminium Sliding System",
    summary: "SlenderLine is a next-generation architectural sliding door and window system engineered for modern living and premium commercial spaces.",
    seoDescription: "Discover Alumex SlenderLine: ultra-slim aluminium sliding doors and windows with expansive views, slim sightlines and seamless indoor-outdoor connections.",
    gallery: [
      {
        src: "https://res.cloudinary.com/dl4q9knom/image/upload/v1794380993/Minimalist_Concrete_Room_with_Park_Views_vju0xp.png",
        alt: "Minimalist aluminium sliding glazing opening onto a green garden"
      },
      {
        src: "/images/home/expertise3.png",
        alt: "Slim aluminium window frames connecting a living space to the outdoors"
      },
      {
        src: "/images/home/expertise4.png",
        alt: "Close-up of aluminium extrusion profiles and precision frame construction"
      },
      {
        src: "https://res.cloudinary.com/dl4q9knom/image/upload/v1794380425/Coastal_Double-Height_Living_Room_uxjid5.png",
        alt: "Tall aluminium-framed glazing bringing coastal views into a contemporary living room"
      }
    ],
    paragraphs: [
      "SlenderLine is a next-generation architectural sliding door and window system engineered for modern living and premium commercial spaces. Designed with super-slim sightlines to highlight expansive views and seamless indoor-outdoor connections, SlenderLine delivers exceptional aesthetics without compromising structural performance, energy efficiency, security or durability.",
      "Where traditional slim systems offer visible mid-frames from and above larger profiles, SlenderLine sets a new benchmark with a remarkably slender midframe of 20 mm upwards externally and 16 mm internally — creating one of the sleekest and most unobtrusive profiles in its class. The result is a clean, minimalist elevation that maximizes natural light and enhances spatial continuity."
    ],
    specifications: [
      {
        title: "Ultra-Slim Profile",
        items: [
          "Midframe width (external): starting from 20 mm",
          "Midframe width (internal): 16 mm"
        ],
        description: "These ultra-slim profiles offer cleaner aesthetics and wider glass expanses, designed especially for projects that demand minimalist design and panoramic views."
      },
      {
        title: "Design & Structure",
        items: [
          "High-strength aluminium construction for robust stability and longevity.",
          "Slim yet structurally optimized profiles suited for residential and commercial glazing.",
          "Concealed drainage and discreet hardware integration for refined architectural expression."
        ]
      },
      {
        title: "Performance Attributes",
        items: [
          "Smooth sliding operation: precision roller systems ensure effortless movement for large sash sizes.",
          "Enhanced natural light: minimal framing maximizes daylight and visual transparency.",
          "Durability: designed to uphold performance in varied climatic conditions.",
          "Thermal &amp; acoustic potential: optimizable with performance glazing options for improved energy efficiency and noise reduction, dependent on glass selection."
        ]
      }
    ],
    specificationsImage: {
      src: "https://res.cloudinary.com/dl4q9knom/image/upload/v1794380993/Minimalist_Concrete_Room_with_Park_Views_vju0xp.png",
      alt: "Expansive garden views through a slim aluminium sliding system"
    },
    benefits: [
      "Ultra-slim interlock starting from 20 mm, providing minimal visible aluminium when closed.",
      "Large-panel capability: sash widths and heights up to approximately 3,000 mm, depending on configuration.",
      "High load capacity: supports sash weights of around 400 kg, depending on configuration.",
      "Glazing compatibility: accommodates glass thicknesses from 5–36 mm.",
      "Excellent weather performance in air permeability, water tightness and wind-load resistance. Compliant with high industry standards.",
      "Sleek, minimalist aesthetics with expansive glass areas and narrow sightlines.",
      "Customizable design options: available in anodized or powder-coated finishes and various opening configurations.",
      "Maximized natural light and panoramic views through slim sightlines.",
      "Seamless indoor-outdoor connection through large sliding panels and flush thresholds.",
      "Ideal for high-end residential and commercial projects where aesthetics and performance are equally important.",
      "Long-term durability and smooth operation ensured by high-performance rollers and rigorous testing."
    ],
    benefitsImage: {
      src: "https://res.cloudinary.com/dl4q9knom/image/upload/v1794380993/Minimalist_Concrete_Room_with_Park_Views_vju0xp.png",
      alt: "Floor-to-ceiling sliding glass doors creating a seamless connection to nature"
    }
  }
];

export function getProductBySlug(slug: string) {
  return productDetails.find(product => product.slug === slug);
}
