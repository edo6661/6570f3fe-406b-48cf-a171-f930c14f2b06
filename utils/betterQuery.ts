export const betterQuery = (q: string) => {
  return q.toLowerCase().replace(/['-]/g, "").trim();
};
