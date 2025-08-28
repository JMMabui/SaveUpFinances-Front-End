import type { userResponse } from "./user.type";

export type getAuthRequest = {
  email: string;
  password: string;
}

export type AuthResponse = {
  token: string;
  user: userResponse;
};
 

