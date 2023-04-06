import { options, url } from "@/lib/info";

export const fetchDogs = async (params) => {
  try {
    const response = await fetch(url("/dogs"), {
      method: "POST",
      body: JSON.stringify(params),
      ...options,
    });
    if (!response.ok) throw new Error("Failed to fetch dogs");
    return response.json();
  } catch (error) {
    return error;
  }
};
