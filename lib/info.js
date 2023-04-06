const headers = {
  "fetch-api-key": process.env.NEXT_PUBLIC_KEY,
  "Content-Type": "application/json",
};

export const options = {
  credentials: "include",
  headers,
};

export const url = (endpoint) => {
  return process.env.NEXT_PUBLIC_BASE_URI + endpoint;
};
