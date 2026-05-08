import { User } from "../models/User";
const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export const initializeUsers = () => {
  const users = localStorage.getItem(
    USERS_KEY
  );

  if (!users) {
    const testUsers: User[] = [
      {
        id: crypto.randomUUID(),
        name: "Test User",
        email: "test@test.com",
        password: "123456",
      },
    ];

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(testUsers)
    );
  }
};

export const register = (
  name: string,
  email: string,
  password: string
) => {
  const users: User[] = JSON.parse(
    localStorage.getItem(USERS_KEY) || "[]"
  );

  const userExists = users.find(
    (user) => user.email === email
  );

  if (userExists) {
    throw new Error("El usuario ya existe");
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
  };

  users.push(newUser);

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );

  return newUser;
};
export const login = (
  email: string,
  password: string
) => {
  const users: User[] = JSON.parse(
    localStorage.getItem(USERS_KEY) || "[]"
  );

  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  if (!user) {
    throw new Error("Credenciales incorrectas");
  }

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );

  return user;
};
export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);

  return user ? JSON.parse(user) : null;
};
export const updateUser = (
  updatedUser: User
) => {
  const users: User[] = JSON.parse(
    localStorage.getItem(USERS_KEY) || "[]"
  );

  const updatedUsers = users.map(
    (user) =>
      user.id === updatedUser.id
        ? updatedUser
        : user
  );

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(updatedUsers)
  );

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(updatedUser)
  );

  return updatedUser;
};
