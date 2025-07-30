interface BookingRequest {
  fixer_id?: number;
  per_page?: number;
  page?: number;
  category_id?: number | string;
  subcategory_id?: number | string;
  service_id?: number | string;
  service_detail_id?: number | string;
  date?: string; // format: DD-MM-YYYY
  time?: string; // format: HH:mm
  address?: string;
  name?: string;
  serve?: string;
};

export interface BookingArray {
    booking: BookingRequest | null
};