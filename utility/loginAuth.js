import { options, url } from "@/lib/info";

export const login = async (body) => {
  return fetch(url("/auth/login"), {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
};
