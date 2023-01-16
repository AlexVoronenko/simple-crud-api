import { createServer, IncomingMessage, ServerResponse } from 'http';
import 'dotenv/config';
import { getUserById, getUsers, createUser, updateUser, deleteUser } from './modules/userController.js';
import { User, isValid } from './modules/userModel.js';

const host = 'localhost';
const port = Number(process.env.PORT) || 8000;

export function res(res: ServerResponse, code: number, message?: { message: string } | User | User[]) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  if (message) {
    res.end(JSON.stringify(message));
  } else {
    res.end();
  }
}

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  console.log(request.url);

  try {
    const id = request.url?.split('/')[3];
    if (request.url === '/') {
      res(response, 200, { message: 'Simple CRUD-API' });
    } else if (request.url === '/api/users') {
      switch (request.method) {
        case 'GET':
          getUsers(request, response);
          break;
        case 'POST':
          createUser(request, response);
          break;

        default:
          res(response, 500, { message: 'Server does not support the request method' });
          break;
      }
    } else if (id) {
      if (isValid(id)) {
        switch (request.method) {
          case 'PUT':
            updateUser(request, response, id);
            break;
          case 'DELETE':
            deleteUser(request, response, id);
            break;
          case 'GET':
            getUserById(request, response, id);
            break;

          default:
            res(response, 500, { message: 'Server does not support the request method' });
            break;
        }
      }
    }
  } catch (error) {
    res(response, 500, { message: 'Server error' });
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
