# Proxy Box

Proxy Box is a Node.js application designed to handle requests from client apps and forward them to the specified actual server. This tool is ideal for web scraping, API request handling, and bypassing network restrictions.

## Features
- HTTP and HTTPS proxy support
- Flexible configuration options
- Easy integration with existing Node.js applications

## Getting Started

1. Proxying requests to another server
2. This is useful for development purposes, where you might want to proxy requests to a backend server.
3. For example, if you have a backend server running on port 3001, you can proxy requests to it like this:

    > This will forward any requests made to http://localhost:3000/proxy to http://localhost:3001.

4. The pathRewrite option is used to remove the /proxy prefix from the request URL before forwarding it to the target server.

    > For example, a request to http://localhost:3000/proxy/api/users will be forwarded to http://localhost:3001/api/users.

5. The changeOrigin option is used to change the origin of the host header to the target URL.
6. This is useful when the target server is expecting a different origin than the one being used by the client.

## Creating a new project

```bash
npm init
npx tsc --init

npm install --save-dev ts-node
npm install express
npm install cors
npm i --save-dev @types/cors
npm i http-proxy-middleware

```

## Installation

```bash
npm install
```

## To Run

```bash

npm run start

# or

nodemon

```

## Usage

```typescript
// [Optional] Change the port number of this application if needed in `proxy-box/src/index.ts`
const PORT = 3000;

// Change the target server url in `proxy-box/src/index.ts`
app.use('/proxy', createProxyMiddleware({
  target: 'http://localhost:3001/', // Your Targeted backend server HTTP
  // target: 'https://localhost:3001/', // Your Targeted backend server HTTPS
  changeOrigin: true,
  pathRewrite: { '^/proxy': '' },
}));
```