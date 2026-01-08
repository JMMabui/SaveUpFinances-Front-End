export interface userResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

export interface userRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  contact: string;
  avatar?: string;
}

export interface userUpdateRequest {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  contact?: string;
  avatar?: string;
}
