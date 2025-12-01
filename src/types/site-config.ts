/**
 * Site Configuration Types
 *
 * These types define the structure of the site.config.json file
 */

export interface SiteConfig {
  business: BusinessInfo;
  contact: ContactInfo;
  services: ServicesSection;
  serviceAreas: ServiceAreasSection;
  projects?: ProjectsSection;
  aboutUs: AboutUsSection;
  process: ProcessSection;
  faq: FAQSection;
  blog?: BlogSection;
  cta: CTASection;
  footer: FooterSection;
  branding: BrandingConfig;
  social: SocialMediaLinks;
  integrations: IntegrationsConfig;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  seoH1?: string;
  primaryLocation: string;
  heroDescription: string;
  heroBackgroundImage: string;
  reviewsSectionBackgroundImage?: string;
  reviewBadges: {
    google: ReviewBadge;
    facebook: ReviewBadge;
  };
  trustBadges?: Array<{
    iconType: string;
    title: string;
  }>;
}

export interface ReviewBadge {
  enabled: boolean;
  rating: number;
  reviewCount: string;
  url: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  googleMapsEmbed: string;
  googleBusinessUrl?: string;
  googleReviewUrl?: string;
}

export interface ServicesSection {
  sectionBadge: string;
  sectionHeading: string;
  items: ServiceItem[];
  details?: Record<string, ServiceDetailPage>;
}

export interface ServiceItem {
  title: string;
  slug: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
}

export interface ServiceDetailPage {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
  };
  sections: ContentSection[];
}

export interface ContentSection {
  heading: string;
  content: string;
}

export interface ServiceAreasSection {
  sectionBadge: string;
  sectionHeading: string;
  ctaText: string;
  cities: CityItem[];
  details?: Record<string, CityDetailPage>;
}

export interface CityItem {
  name: string;
  slug: string;
  description?: string;
}

export interface CityDetailPage {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  sections: ContentSection[];
}

export interface AboutUsSection {
  sectionBadge: string;
  sectionHeading: string;
  paragraphs: string[];
  stats: {
    yearsExperience: StatItem;
    projectsCompleted: StatItem;
    satisfactionRate: StatItem;
  };
  image: {
    src: string;
    alt: string;
  };
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ProcessSection {
  sectionBadge: string;
  sectionHeading: string;
  description: string;
  steps: ProcessStep[];
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface FAQSection {
  sectionBadge: string;
  sectionHeading: string;
  items: FAQItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogSection {
  sectionBadge: string;
  sectionHeading: string;
  sectionDescription: string;
}

export interface CTASection {
  heading: string;
  subheading: string;
  buttonText: string;
  backgroundImage: string;
}

export interface FooterSection {
  companyDescription: string;
  businessLinks: LinkItem[];
  legalLinks: LinkItem[];
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  copyrightText: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface BrandingConfig {
  logo: {
    horizontal: string;
    horizontalInverted: string;
  };
  colors: {
    primary: string;
    primaryLight?: string;
    primaryDark?: string;
    primaryHover?: string;
    backgroundBlue: string;
    backgroundBlueLight?: string;
    backgroundBlueDark?: string;
    premium?: string;
    premiumLight?: string;
    premiumDark?: string;
    navBackground?: string;
    navBorder?: string;
    badgeBg?: string;
    badgeText?: string;
    badgeBgInverted?: string;
    badgeTextInverted?: string;
  };
  logoDimensions?: {
    horizontal?: {
      width: number;
      height: number;
      maxHeight: number;
    };
    horizontalInverted?: {
      width: number;
      height: number;
      maxHeight: number;
    };
  };
}

export interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  google?: string;
  yelp?: string;
  linkedin?: string;
}

export interface IntegrationsConfig {
  ghl: {
    quoteFormEmbedInline: string;
    quoteFormEmbedPopup: string;
    chatWidgetEmbed: string;
    reviewsEmbed?: string;
  };
  featurable?: {
    widgetId: string;
  };
}

export interface ProjectsSection {
  gallery: GalleryImage[];
  heroBackgroundImage?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  imageSrc: string;
  alt: string;
  category?: string;
  featured?: boolean;
}
