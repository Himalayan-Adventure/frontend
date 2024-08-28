declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_WEBSITE_URL: string;
    NEXT_PUBLIC_STRAPI_URL: string;
    NODE_ENV: "development" | "production";
  }
}
