"use server";

import { suggestDestinations, type SuggestDestinationsInput, type SuggestDestinationsOutput } from "@/ai/flows/suggest-destinations";

interface SuggestDestinationsResult {
  success: boolean;
  data?: SuggestDestinationsOutput;
  error?: string;
}

export async function handleSuggestDestinations(input: SuggestDestinationsInput): Promise<SuggestDestinationsResult> {
  try {
    const result = await suggestDestinations(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in handleSuggestDestinations:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred." };
  }
}
