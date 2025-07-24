export type SpecificService = {
  id: number | string;
  name: string;
  category_image: string;
  services: number;
  price?: number;
  duration?: string;
  description?: string;
};

export type Category = {
  id: string | number;
  name: string;
  services: string;
  category_image: string;
};

export type Subcategory = {
  id: number;
  name: string;
  services_list: SpecificService[];
};