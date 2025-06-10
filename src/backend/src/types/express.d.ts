declare global {
  namespace Express {
    export interface User {
      id: string;
      email: string;
      firstname: string;
      lastname: string;
      createdAt: string;
      updatedAt: string;
    }
  }
}
