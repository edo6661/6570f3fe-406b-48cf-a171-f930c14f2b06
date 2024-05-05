export const errHandler = <T>(err: T, message?: string, callback?: () => T) => {
  if (message) console.error(message);
  if (callback) callback();
  console.error(err);
  return err;
};
