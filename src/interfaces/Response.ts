export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: UserData;
}

export interface UserData {
  email: string;
  name: string;
  password: string;
  _id: string;
}

export interface CategoryData {
  name: string;
  userId: string;
  _id: string;
}

export interface CategoryResponse {
  category: CategoryData;
  message: string;
}
