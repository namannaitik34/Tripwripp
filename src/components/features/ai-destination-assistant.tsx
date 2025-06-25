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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Lightbulb, Send } from "lucide-react";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { handleSuggestDestinations } from "@/app/actions";
import type { SuggestDestinationsOutput } from "@/ai/flows/suggest-destinations";

const aiAssistantFormSchema = z.object({
  interests: z.string().min(3, { message: "Please describe your interests (min 3 characters)." }),
  travelStyle: z.string({ required_error: "Please select your travel style." }),
  country: z.string().optional(),
  budget: z.string({ required_error: "Please select your budget." }),
});

type AiAssistantFormValues = z.infer<typeof aiAssistantFormSchema>;

const travelStyles = ["Luxury", "Mid-Range", "Budget", "Backpacking", "Family-Friendly", "Solo Adventure", "Romantic Getaway", "Cultural Immersion", "Adventure Sports"];
const budgets = ["Low", "Medium", "High", "Flexible"];

export function AiDestinationAssistant() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<SuggestDestinationsOutput | null>(null);

  const form = useForm<AiAssistantFormValues>({
    resolver: zodResolver(aiAssistantFormSchema),
    defaultValues: {
      interests: "",
      country: "",
      travelStyle: "",
      budget: "",
    },
  });

  async function onSubmit(data: AiAssistantFormValues) {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await handleSuggestDestinations(data);
      if (result.success && result.data) {
        setSuggestions(result.data);
        toast({
          title: "Suggestions Ready!",
          description: "We've found some destinations for you.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.error || "There was a problem with your request.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-headline font-semibold tracking-tight text-center flex items-center justify-center gap-2">
        <Sparkles className="h-8 w-8 text-primary" /> AI Destination Assistant
      </h2>
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Tell us your preferences</CardTitle>
          <CardDescription>Our AI will suggest tailored destinations based on your travel style.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., history, food, adventure, nature" {...field} />
                    </FormControl>
                    <FormDescription>
                      What do you love to do or see when you travel?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Country (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Italy, Japan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="travelStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Travel Style</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your travel style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {travelStyles.map(style => (
                          <SelectItem key={style} value={style.toLowerCase().replace(/\s+/g, '_')}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your budget range" />
                        </Trigger>
                      </FormControl>
                      <SelectContent>
                        {budgets.map(budget => (
                          <SelectItem key={budget} value={budget.toLowerCase()}>{budget}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading} variant="cta">
                {isLoading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Getting Suggestions...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Suggest Destinations
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {suggestions && suggestions.destinations.length > 0 && (
        <Card className="max-w-2xl mx-auto mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Lightbulb className="h-6 w-6 text-primary" />
              Here are your tailored suggestions:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {suggestions.destinations.map((destination, index) => (
                <li key={index} className="text-md">{destination}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">These suggestions are AI-generated. We recommend further research before planning your trip.</p>
          </CardFooter>
        </Card>
      )}
       {suggestions && suggestions.destinations.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">The AI couldn't find specific suggestions for your criteria. Try adjusting your preferences!</p>
      )}
    </div>
  );
}
