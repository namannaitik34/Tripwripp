'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, Users, Map } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-cover bg-center text-white">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Breathtaking travel destination"
        fill
        style={{ objectFit: 'cover' }}
        className="z-0"
        data-ai-hint="travel landscape"
        priority
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="z-20 text-center p-4 relative">
        <h1 className="text-5xl md:text-7xl font-bold font-headline drop-shadow-lg animate-fade-in-down">
          Your Adventure Awaits
        </h1>
        <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-md animate-fade-in-up">
          Discover unique destinations, find like-minded travel buddies, and plan your next unforgettable trip with TripWripp.
        </p>
        <Button asChild size="lg" variant="cta" className="mt-8 text-lg">
          <Link href="/destinations">Start Exploring</Link>
        </Button>
      </div>
    </section>
  );
};

const FeaturedSection = () => {
  const features = [
    {
      icon: <Map className="h-10 w-10 text-primary mb-4 mx-auto" />,
      title: "Explore Destinations",
      description: "Discover curated travel spots from around the globe, from hidden gems to popular landmarks.",
      href: "/destinations",
    },
    {
      icon: <Users className="h-10 w-10 text-primary mb-4 mx-auto" />,
      title: "Find Travel Buddies",
      description: "Connect with like-minded travelers who share your interests and are heading to the same places.",
      href: "/buddy-finder",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary mb-4 mx-auto" />,
      title: "AI-Powered Suggestions",
      description: "Get personalized travel recommendations from our smart AI assistant based on your unique preferences.",
      href: "/ai-assistant",
    },
  ];

  return (
    <section id="featured-section" className="bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose TripWripp?</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide everything you need to plan your next adventure, all in one place.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href} className="block text-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              {feature.icon}
              <h3 className="text-xl font-semibold font-headline mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
    </>
  );
}
