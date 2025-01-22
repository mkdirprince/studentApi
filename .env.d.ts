declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_URL: string;
      TEST_POSTGRES_PASSWORD: string;
      PORT: string;
    }
  }
}
