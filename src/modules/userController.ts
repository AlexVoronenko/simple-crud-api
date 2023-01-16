import { IncomingMessage, ServerResponse } from 'http';
import { User, getAllUsers, getById, createNewUser, update, deleteUserByID } from './userModel.js';
import { res } from '../index.js';

export async function getUsers(request: IncomingMessage, response: ServerResponse) {
  const users = (await getAllUsers()) as User;
  res(response, 200, users);
}

export async function getUserById(request: IncomingMessage, response: ServerResponse, id: string) {
  const user = (await getById(id)) as User;
  if (user) {
    res(response, 200, user);
  } else {
    res(response, 404, { message: 'User Not Found' });
  }
}

async function getPostData(request: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      request.on('data', (chunk) => {
        body += chunk.toString();
      });
      request.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function createUser(request: IncomingMessage, response: ServerResponse) {
  const body = (await getPostData(request)) as string;
  const { username, age, hobbies } = JSON.parse(body);

  if (!username || !age || !hobbies) {
    res(response, 400, { message: "doesn't contain required fields " });
  } else {
    const user = { username, age, hobbies };
    const newUser = (await createNewUser(user)) as User;
    res(response, 201, newUser);
  }
}

export async function updateUser(request: IncomingMessage, response: ServerResponse, id: string) {
  const user = (await getById(id)) as User;

  console.log('updateUser', id, user);
}

export async function deleteUser(request: IncomingMessage, response: ServerResponse, id: string) {
  console.log('deleteUser', id);
}
