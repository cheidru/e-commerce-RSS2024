interface Price {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  discounted?: {
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    discount: {
      typeId: string;
      id: string;
    };
  };
}

interface Image {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface Attribute {
  name: string;
  value: string;
}

interface Variant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  assets: string; // []
}

interface Current {
  name: {
    en: string;
  };
  description: {
    en: string;
  };
  categories: {
    typeId: string;
    id: string;
  }[];
  categoryOrderHints: string; // object
  slug: {
    en: string;
  };
  metaTitle: {
    en: string;
  };
  metaDescription: {
    en: string;
  };
  masterVariant: Variant;
  variants: Variant[];
  searchKeywords: string;
}

interface MasterData {
  current: Current;
  staged: Current;
  published: boolean;
  hasStagedChanges: boolean;
}

interface Product {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  productType: {
    typeId: string;
    id: string;
  };
  masterData: MasterData;
  taxCategory: {
    typeId: string;
    id: string;
  };
  lastVariantId: number;
}

export interface IProductResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Product[];
}
// Category Interface
interface ProductCategoryProducts {
  categories: {
    typeId: string;
    id: string;
  };
  categoryOrderHints: string;
  createdAt: string;
  description: {
    en: string;
  };
  hasStagedChanges: boolean;
  id: string;
  lastModifiedAt: string;
  masterVariant: {
    assets: string[];
    attributes: [
      {
        size: string;
        name: string;
        model: string;
      },
    ];
    id: number;
    images: Image[];
    key: string;
    prices: Price[];
    sku: string;
  };
  metaDescription: {
    en: string;
  };
  metaTitle: {
    en: string;
  };
  name: {
    en: string;
  };
  productType: {
    typeId: string;
    id: string;
  };
  published: boolean;
  searchKeywords: string;
  slug: {
    en: string;
  };
  taxCategory: {
    typeId: string;
    id: string;
  };
  variants: Variant[];
  version: number;
}

export interface IProductResponseCategory {
  count: number;
  facets: object;
  limit: number;
  offset: number;
  results: ProductCategoryProducts[];
}
