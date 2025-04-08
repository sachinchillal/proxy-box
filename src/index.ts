import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { loggingMiddleware } from './middlewares';

const app = express()

// Middleware to log requests and responses
app.use(loggingMiddleware)

// Middleware to parse JSON bodies
app.use(express.json())

// To allow all cross-origin requests
app.use(cors())

// To allow specific origins only
/*
const allowedOrigins = ['http://localhost:4200', 'http://localhost:8080'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
*/

const PORT = 3000;

app.get('/', (req, res) => {
  res.send({ data: ['Hello World'] })
})

/**
 * * Proxying requests to another server
 * * This is useful for development purposes, where you might want to proxy requests to a backend server.
 * * * For example, if you have a backend server running on port 3001, you can proxy requests to it like this:
 * * This will forward any requests made to http://localhost:3000/proxy to http://localhost:3001.
 * * The pathRewrite option is used to remove the /proxy prefix from the request URL before forwarding it to the target server.
 * * For example, a request to http://localhost:3000/proxy/api/users will be forwarded to http://localhost:3001/api/users.
 * * * The changeOrigin option is used to change the origin of the host header to the target URL.
 * * This is useful when the target server is expecting a different origin than the one being used by the client.
 */
app.use('/proxy', createProxyMiddleware({
  target: 'http://localhost:3001/', // Your Targeted backend server HTTP
  // target: 'https://localhost:3001/', // Your Targeted backend server HTTPS
  changeOrigin: true,
  pathRewrite: { '^/proxy': '' },
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});