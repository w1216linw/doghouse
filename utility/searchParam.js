export const searchParam = (zipCodes, age, breeds, sort) => {
  const params = new URLSearchParams();
  if (zipCodes.length > 0) {
    zipCodes.forEach((zc) => params.append("zipCodes", zc));
  }
  if (age.min !== "") params.append("ageMin", age.min);
  if (age.max !== "") params.append("ageMax", age.max);
  if (breeds.length > 0) breeds.forEach((b) => params.append("breeds", b));
  if (sort !== "") params.append("sort", sort);
  return params.toString();
};

export const searchParamSlice = (url) => {
  const idx = url.indexOf("?");
  return url.slice(idx + 1);
};
