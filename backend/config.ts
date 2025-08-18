export const config = {
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  },
  PROXY_URL: 'http://proxyhost:port', // ou socks5://user:pass@host:1080
};
