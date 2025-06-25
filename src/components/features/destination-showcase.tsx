"use client";

import type { Destination } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const mockDestinations: Destination[] = [
  { id: '1', name: 'Kyoto, Japan', description: 'Ancient temples, serene gardens, and traditional tea houses.', image: 'https://placehold.co/600x400.png', imageHint: 'kyoto temple' },
  { id: '2', name: 'Rome, Italy', description: 'Historic ruins, stunning art, and vibrant street life.', image: 'https://placehold.co/600x400.png', imageHint: 'rome colosseum' },
  { id: '3', name: 'Santorini, Greece', description: 'Iconic whitewashed villages and breathtaking sunsets over the Aegean Sea.', image: 'https://placehold.co/600x400.png', imageHint: 'santorini sunset' },
  { id: '4', name: 'Banff National Park, Canada', description: 'Turquoise lakes, majestic mountains, and abundant wildlife.', image: 'https://placehold.co/600x400.png', imageHint: 'banff lake' },
  { id: '5', name: 'Paris, France', description: 'The city of lights, romance, art, and iconic landmarks.', image: 'https://placehold.co/600x400.png', imageHint: 'paris eiffel' },
  { id: '6', name: 'Maui, Hawaii, USA', description: 'Beautiful beaches, lush rainforests, and volcanic landscapes.', image: 'https://placehold.co/600x400.png', imageHint: 'maui beach' },
];

export function DestinationShowcase() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-headline font-semibold tracking-tight text-center">Popular Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDestinations.map((destination) => (
          <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <CardHeader className="p-0">
              <div className="aspect-[3/2] relative w-full">
                <Image
                  src="https://i.ibb.co/prwQMX24/IMG-0153.jpg"
                  alt={destination.name}
                  width={500}
                  height={500}
                  objectFit="cover"
                  data-ai-hint={destination.imageHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-headline mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {destination.name}
              </CardTitle>
              <CardDescription>{destination.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
