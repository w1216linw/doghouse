import { options, url } from "@/lib/info";

export const fetchLocation = async (params) => {
  try {
    const res = await fetch(url("/locations"), {
      method: "POST",
      body: JSON.stringify(params),
      ...options,
    });

    if (!res.ok) throw new Error("Failed to fetch locations");
    return res.json();
  } catch (error) {
    return error;
  }
};
