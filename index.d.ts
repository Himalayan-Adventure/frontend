declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_WEBSITE_URL: string;
    NEXT_PUBLIC_WEBSITE_DOMAIN: string;
    NEXT_PUBLIC_STRAPI_URL: string;
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
    NODE_ENV: "development" | "production";
  }
}

/**
 * Represents a type that can be either a value of type T, null, or undefined.
 * @template T - The type of the value.
 */
type Maybe<T> = T | null | undefined;

/**
 * Takes an object type and makes the hover overlay more readable.
 */
