const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'http://47.111.7.71:3000';

export const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => res.data);