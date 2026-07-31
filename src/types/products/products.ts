export type IProductResponse = {
  data: IProduct[];
};

export type IProduct = {
  id: number;
  documentId: string;
  name: string;
  price: number;
  description: string;
  charge: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  shop_categories: {
    id: number;
    documentId: string;
    name: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }[];
  image: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
        provider_metadata: {
          public_id: string;
          resource_type: string;
        };
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
    createdAt: string;
    updatedAt: string;
  }[];
};
