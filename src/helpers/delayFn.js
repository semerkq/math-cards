export const delayFn = (delay = 500) => {
  return new Promise((res) => setTimeout(res, delay));
};
