const protocol = "http:";
const host = "127.0.0.1";
const port = "8000";

export const getUrl = path => {
  return `${protocol}//${host}:${port}/${path}`;
};
