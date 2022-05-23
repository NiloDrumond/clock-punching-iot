export type SignInData = {
  username: string;
  password: string;
};

export interface AuthContextData {
  signIn: (data: SignInData) => Promise<boolean>;
  signOut: () => void;
  isLoading: boolean;
  token?: string;
}

export interface AuthenticatedContextData extends AuthContextData {
  token: string;
}
