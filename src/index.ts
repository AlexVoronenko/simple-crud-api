import { createServer, IncomingMessage, ServerResponse } from 'http';
import 'dotenv/config';

const host = 'localhost';
const port = Number(process.env.PORT) || 8000;

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  switch (request.method) {
    case 'GET':
      console.log(request.method);
      break;
    case 'POST':
      console.log(request.method);
      break;
    case 'PUT':
      console.log(request.method);
      break;
    case 'DELETE':
      console.log(request.method);
      break;

    default:
      response.statusCode = 404;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ title: 'Not Found', message: 'Route not found' }));
      response.end();
      break;
  }

  response.end('Hello world!');
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
