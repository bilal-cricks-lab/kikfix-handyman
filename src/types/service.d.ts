export type SpecificService = {
  id: number | string;
  name: string;
  category_image: string;
  services: number;
  price?: number;
  duration?: string;
  description?: string;
  min_price: string;
  max_price: string
  min_duration: number;
  max_duration: number;
  job_size: boolean;
  subcategory_id: number;
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