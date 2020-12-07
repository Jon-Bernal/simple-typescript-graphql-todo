declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_USER: string;
    MONGO_PW: string;
    MONGO_STRING: string;
    PORT: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    COOKIE_NAME: string;
    PROGRESS: string;
  }
}
