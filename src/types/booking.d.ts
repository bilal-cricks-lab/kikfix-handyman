interface BookingRequest {
  fixer_id?: number;
  per_page?: number;
  page?: number;
  category_id?: number | string;
  subcategory_id?: number | string;
  service_id?: number | string;
  service_detail_id?: number;
  date?: string; // format: DD-MM-YYYY
  time?: string; // format: HH:mm
  address?: string;
};

export interface BookingArray {
    booking: BookingRequest | null
};