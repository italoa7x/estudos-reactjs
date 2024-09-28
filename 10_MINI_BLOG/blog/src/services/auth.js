import api from "../config/axios";

import { BASE_URL } from "../utils/base-url";
const createAccount = async (data) => {
  return await api.post(`${BASE_URL}/auth/register`, JSON.stringify(data));
};

const authenticate = async (data) => {
  return await api.post(`${BASE_URL}/auth/login`, JSON.stringify(data));
};

export { authenticate, createAccount };
