"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CalendarIcon, Filter, Users, Search } from "lucide-react";
import { format } from "date-fns";
import type { TravelBuddyProfile } from "@/types";
import React from "react";

const interestsList = [
  { id: "adventure", label: "Adventure" },
  { id: "relaxation", label: "Relaxation" },
  { id: "culture", label: "Culture" },
  { id: "foodie", label: "Foodie" },
  { id: "nightlife", label: "Nightlife" },
  { id: "nature", label: "Nature" },
] as const;

const travelBuddyFormSchema = z.object({
  destination: z.string().min(2, { message: "Destination must be at least 2 characters." }),
  travelDate: z.date().optional(),
  ageGroup: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

type TravelBuddyFormValues = z.infer<typeof travelBuddyFormSchema>;

const mockProfiles: TravelBuddyProfile[] = [
  { id: '1', name: 'Alex P.', age: 28, interests: ['Adventure', 'Nature'], destination: 'Patagonia', travelDate: '2024-12-15', avatar: 'https://placehold.co/100x100.png', avatarHint: 'person smiling' },
  { id: '2', name: 'Jamie L.', age: 32, interests: ['Culture', 'Foodie'], destination: 'Tokyo', travelDate: '2025-03-10', avatar: 'https://placehold.co/100x100.png', avatarHint: 'traveler portrait' },
  { id: '3', name: 'Sam K.', age: 25, interests: ['Relaxation', 'Nightlife'], destination: 'Ibiza', travelDate: '2024-07-20', avatar: 'https://placehold.co/100x100.png', avatarHint: 'person beach' },
];


export function TravelBuddyFinder() {
  const [searchResults, setSearchResults] = React.useState<TravelBuddyProfile[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const form = useForm<TravelBuddyFormValues>({
    resolver: zodResolver(travelBuddyFormSchema),
    defaultValues: {
      destination: "",
      interests: [],
    },
  });

  function onSubmit(data: TravelBuddyFormValues) {
    console.log(data);
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockProfiles.filter(profile => 
        profile.destination.toLowerCase().includes(data.destination.toLowerCase())
      ));
      setIsSearching(false);
    }, 1000);
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-headline font-semibold tracking-tight text-center flex items-center justify-center gap-2">
        <Users className="h-8 w-8 text-primary" /> Find Your Travel Buddy
      </h2>
      <Card className="shadow-lg max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-headline"><Filter className="h-5 w-5 text-primary" /> Search Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Paris, Bali, New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="travelDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preferred Travel Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ageGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Group (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an age group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="18-25">18-25</SelectItem>
                        <SelectItem value="26-35">26-35</SelectItem>
                        <SelectItem value="36-45">36-45</SelectItem>
                        <SelectItem value="46-55">46-55</SelectItem>
                        <SelectItem value="56+">56+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Interests (Optional)</FormLabel>
                      <FormDescription>
                        Select interests that match your travel style.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {interestsList.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(
                                          (field.value || []).filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSearching}>
                <Search className="mr-2 h-4 w-4" /> {isSearching ? "Searching..." : "Search Buddies"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isSearching && <p className="text-center">Searching for travel buddies...</p>}
      
      {!isSearching && searchResults.length > 0 && (
        <div className="space-y-6 mt-8">
          <h3 className="text-2xl font-headline font-semibold tracking-tight text-center">Matching Profiles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map(profile => (
              <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="items-center text-center">
                  <Image 
                    src={profile.avatar} 
                    alt={profile.name} 
                    width={80} 
                    height={80} 
                    className="rounded-full mb-2"
                    data-ai-hint={profile.avatarHint}
                  />
                  <CardTitle className="font-headline">{profile.name}, {profile.age}</CardTitle>
                  <CardDescription>Seeking buddies for {profile.destination}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-1"><strong>Travel Date:</strong> {format(new Date(profile.travelDate), "PPP")}</p>
                  <p className="text-sm"><strong>Interests:</strong> {profile.interests.join(', ')}</p>
                  <Button variant="outline" className="w-full mt-4">Connect</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      {!isSearching && searchResults.length === 0 && form.formState.isSubmitted && (
         <p className="text-center text-muted-foreground">No profiles found matching your criteria. Try broadening your search!</p>
      )}
    </div>
  );
}
