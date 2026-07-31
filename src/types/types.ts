import type { Data, UID } from "@strapi/strapi";

export type IDProperty = { id: number };

/**
 * Strapi v5 flattens entries (no more `.attributes` wrapping) and adds `documentId`.
 * `Data.ContentType` is Strapi's own type derived straight from the generated schema.
 */
export type APIResponseData<TContentTypeUID extends UID.ContentType> =
  Data.ContentType<TContentTypeUID>;

export interface APIResponseCollectionMetadata {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface APIResponse<TContentTypeUID extends UID.ContentType> {
  data: APIResponseData<TContentTypeUID> | null;
  meta: Record<string, unknown>;
}

export interface APIResponseCollection<
  TContentTypeUID extends UID.ContentType,
> {
  data: APIResponseData<TContentTypeUID>[];
  meta: APIResponseCollectionMetadata;
}
