export interface SignUpNewUser {
    name: string;
    email: string;
    date: string;
    password: string;
    confirm_password: string;
    returnSecureToken: boolean;
  }
  
  export interface SignUpResponse{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
    displayName?: string;
    role? :string
  }
  
  export interface SignInUser {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }
  