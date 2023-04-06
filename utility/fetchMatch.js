import { options, url } from "@/lib/info";

export const fetchMatch = async (params) => {
  try {
    const res = await fetch(url("/dogs/match"), {
      method: "POST",
      body: JSON.stringify(params),
      ...options,
    });

    if (!res.ok) throw new Error("Failed to matched dog");
    return res.json();
  } catch (error) {
    return error;
  }
};
