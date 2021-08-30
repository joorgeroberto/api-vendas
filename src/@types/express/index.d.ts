// Acrescentando user ao Request da lib Express
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
