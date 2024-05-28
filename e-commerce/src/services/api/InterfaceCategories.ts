interface Category {
  ancestors: string;
  assets: string;
  createdAt: string;
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  externalId: string;
  id: string;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: 'MXjx0D7Jw1Cmi0ZqSHWq2MUJ';
    isPlatformClient: false;
  };
  name: { en: 'Door Levers' };
  orderHint: string;
  slug: { en: 'door-levers' };
  version: number;
  versionModifiedAt: string;
}

export interface ICategoryesResponse {
  count: number;
  limit: number;
  offset: number;
  results: Category[];
  total: number;
}
