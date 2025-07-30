export type FixerServices = {
  fixer_id?: number | string;
}

export type SpecificService = {
  id: string | number;
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
  fixer_services: FixerServices[];
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

export type JobDetails = {
  id: number | string;
  title: string;
  description: string;
  min_duration?: string;
  max_duration?: string;
  tags: string;
  service_id?: string;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
};

export type JobDetailsArray = {
  jobDetails: JobDetails[];
}