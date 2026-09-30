export interface AuthUser {
  id: number;
  username: string;
  displayName: string;
  avatarColor: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  expiresIn: number;
  user: AuthUser;
}
