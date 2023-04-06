import { options, url } from "@/lib/info";

export const fetchDogIds = async (params) => {
  try {
    const response = await fetch(url(`/dogs/search?${params}`), {
      ...options,
    });
    if (!response.ok) throw new Error("Failed to fetch dog ids");
    return response.json();
  } catch (error) {
    return error;
  }
};
