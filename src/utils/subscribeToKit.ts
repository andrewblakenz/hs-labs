"use server";

export const subscribeToKit = async (email: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/7509276/subscribe?api_key=sgIKP266mVAXGFAVHqE1jw&email=${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    if (response.ok) {
      return "success";
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Subscription failed");
    }
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : "An unknown error occurred"}`;
  }
};
