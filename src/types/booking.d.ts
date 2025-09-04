interface BookingRequest {
  id?: string;
  fixer_id?: number;
  per_page?: number;
  display?: string;
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
  latitude?: string | number;
  longitude?: string | number;
  urgency_level?: string | null | undefined;
  duration?: string | number;
  price?: string | number;
  fromTime?: string | number;
  toTime?: string | number;
  instruction?: string;
  distance?: string
};

export interface BookingArray {
    booking: BookingRequest | null
};