import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';
import next from 'next';


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    if (dev) {
      server.use(
        '/api',
        createProxyMiddleware({
          target: 'http://localhost:8001', // Your server address
          changeOrigin: true,
        })
      );
    }

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.log('Error', err);
  });
