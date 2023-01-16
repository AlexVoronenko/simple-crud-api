import { v4, validate, version } from 'uuid';

export const isValid = (id: string): boolean => {
  return validate(id) && version(id) === 4;
};

export type User = {
  id?: string;
  username: string;
  age: number;
  hobbies: Array<string>;
};

interface Database {
  users: Array<User>;
}

export const database: Database = {
  users: [],
};

let { users } = database;

export function getAllUsers() {
  return new Promise((resolve) => {
    resolve(database.users);
  });
}

export function getById(id: string) {
  return new Promise((resolve) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
}

export function createNewUser(user: User) {
  return new Promise((resolve) => {
    const newUser = { id: v4(), ...user } as User;
    users.push(newUser);
    resolve(newUser);
  });
}

export function update(id: string, userData: User) {
  return new Promise((resolve) => {
    const index = users.findIndex((user) => user.id === id);
    users[index] = { id, ...userData };
    resolve(users[index]);
  });
}

export function deleteUserByID(id: string) {
  return new Promise<void>((resolve) => {
    users = users.filter((user) => user.id !== id);
    resolve();
  });
}
