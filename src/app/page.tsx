'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DestinationShowcase } from '@/components/features/destination-showcase';
import { PackagePresentation } from '@/components/features/package-presentation';
import { TravelBuddyFinder } from '@/components/features/travel-buddy-finder';
import { AiDestinationAssistant } from '@/components/features/ai-destination-assistant';
import { Plane, Users, Sparkles, Map } from 'lucide-react';

function HomeContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'destinations';
  
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    // Using push to add a new entry to the history stack
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <main className="flex-grow container mx-auto p-4 py-8">
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
  );
}


export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
