'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { DestinationShowcase } from '@/components/features/destination-showcase';
import { PackagePresentation } from '@/components/features/package-presentation';
import { TravelBuddyFinder } from '@/components/features/travel-buddy-finder';
import { AiDestinationAssistant } from '@/components/features/ai-destination-assistant';
import { Plane, Users, Sparkles, Map } from 'lucide-react';

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
          <Link href="#featured-section">Start Exploring</Link>
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
    },
    {
      icon: <Users className="h-10 w-10 text-primary mb-4 mx-auto" />,
      title: "Find Travel Buddies",
      description: "Connect with like-minded travelers who share your interests and are heading to the same places.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary mb-4 mx-auto" />,
      title: "AI-Powered Suggestions",
      description: "Get personalized travel recommendations from our smart AI assistant based on your unique preferences.",
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
            <div key={index} className="text-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              {feature.icon}
              <h3 className="text-xl font-semibold font-headline mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function HomeContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'destinations';
  
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <main id="main-content" className="flex-grow container mx-auto p-4 py-8">
        <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto mb-8">
            <TabsTrigger value="destinations" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg flex items-center gap-2">
              <Map className="h-5 w-5" /> Destinations
            </TabsTrigger>
            <TabsTrigger value="packages" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg flex items-center gap-2">
              <Plane className="h-5 w-5" /> Packages
            </TabsTrigger>
            <TabsTrigger value="buddy_finder" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg flex items-center gap-2">
              <Users className="h-5 w-5" /> Travel Buddy
            </TabsTrigger>
            <TabsTrigger value="ai_assistant" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> AI Assistant
            </TabsTrigger>
          </TabsList>
          <TabsContent value="destinations">
            <DestinationShowcase />
          </TabsContent>
          <TabsContent value="packages">
            <PackagePresentation />
          </TabsContent>
          <TabsContent value="buddy_finder">
            <TravelBuddyFinder />
          </TabsContent>
          <TabsContent value="ai_assistant">
            <AiDestinationAssistant />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}


export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
