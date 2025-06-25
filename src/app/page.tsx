'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Suspense, useEffect, useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DestinationShowcase } from '@/components/features/destination-showcase';
import { PackagePresentation } from '@/components/features/package-presentation';
import { TravelBuddyFinder } from '@/components/features/travel-buddy-finder';
import { AiDestinationAssistant } from '@/components/features/ai-destination-assistant';
import { Briefcase, Compass, Sparkles, Users, Newspaper } from 'lucide-react';
import Link from 'next/link';

function HomePageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('destinations');

  useEffect(() => {
    const tab = searchParams.get('tab');
    const validTabs = ['destinations', 'packages', 'buddy_finder', 'ai_assistant'];
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('destinations');
    }
  }, [searchParams]);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    router.push(`${pathname}?tab=${value}`, { scroll: false });
  }, [router, pathname]);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow container mx-auto p-4 py-8 md:p-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto">
            <TabsTrigger value="destinations" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg flex items-center gap-2">
              <Compass className="h-5 w-5" /> Destinations
            </TabsTrigger>
            <TabsTrigger value="packages" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> Packages
            </TabsTrigger>
            <TabsTrigger value="buddy_finder" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg flex items-center gap-2">
              <Users className="h-5 w-5" /> Travel Buddy
            </TabsTrigger>
            <TabsTrigger value="ai_assistant" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> AI Assistant
            </TabsTrigger>
            <TabsTrigger value="scroll" asChild className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg flex items-center gap-2">
              <Link href="/scroll">
                <Newspaper className="h-5 w-5" /> Scroll
              </Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="destinations" className="rounded-lg shadow-sm">
            <DestinationShowcase />
          </TabsContent>
          <TabsContent value="packages" className="rounded-lg shadow-sm">
            <PackagePresentation />
          </TabsContent>
          <TabsContent value="buddy_finder" className="rounded-lg shadow-sm">
            <TravelBuddyFinder />
          </TabsContent>
          <TabsContent value="ai_assistant" className="rounded-lg shadow-sm">
            <AiDestinationAssistant />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t border-border mt-auto">
        © {new Date().getFullYear()} TripWripp. All rights reserved.
      </footer>
    </div>
  );
}

export default function Home() {
    return (
        <Suspense> 
            <HomePageContent />
        </Suspense>
    )
}
