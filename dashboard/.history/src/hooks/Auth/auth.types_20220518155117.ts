export type SignInData = {
  username: string;
  password: string;
};

export interface AuthContextData {
  signIn: (data: SignInData) => void;
  signOut: () => void;
}
