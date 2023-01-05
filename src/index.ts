import { createServer, IncomingMessage, ServerResponse } from 'http';

const host = 'localhost';
const port = 8000;

const server = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    response.end('Hello world!');
  },
);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
