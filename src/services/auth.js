//Створимо функцію в сервісі для створення користувача

import { UsersCollection } from "../db/models/user.js";

export const registerUser = async (payload) => {
    return await UsersCollection.create(payload);
  };