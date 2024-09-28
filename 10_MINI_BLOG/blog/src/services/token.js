import { getItem } from "../utils/session-storage";

export const getToken = () => {
  return getItem("token");
};
