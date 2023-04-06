import { options, url } from "@/lib/info";

export const fetchBreeds = async () => {
  try {
    const response = await fetch(url("/dogs/breeds"), {
      ...options,
    });
    if (!response.ok) throw new Error("Failed to fetch dog breeds");
    return response.json();
  } catch (error) {
    return error;
  }
};
