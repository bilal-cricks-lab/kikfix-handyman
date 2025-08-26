interface JobCardProps {
  job: {
    id: string;
    urgency_level: string;
    instruction: string;
    status?: string;
    address: string;
    min_time: string;
    max_time: string;
    distance?: string;
    postedTime?: string;
    date?: string;
    category: {
      name: string;
    };
    customer: {
      username: string;
      profile_image: string;
    };
    fixer_service: {
      price: number;
      estimated_time: number;
      price: number;
      estimated_time: number;
      id: number;
      fixer_id: number;
      customer_id: number;
      category_id: number;
      service_id: number;
      service_detail_id: number | null;
      date: string;
      min_time: string;
      max_time: string;
      address: string;
      instruction: string;
      detail: string | null;
      latitude: string;
      longitude: string;
      urgency_level: 'standard' | 'urgent';
      subcategory_id: number;
      status: string;
      contact_method: string;
      fixer_accept: number;
      fixer_accepted_at: string | null;
      fixer_complete: boolean | null;
      fixer_completed_at: string | null;
      created_at: string;
      updated_at: string;
      distance: number | null;
      duration: number | null;
    };
    counter_offer: {
      id: number;
      booking_id: number;
      fixer_id: number;
      date: string; // "2025-08-30"
      min_time: string; // "03:00:00"
      max_time: string; // "05:00:00"
      reason: string;
      status: string | null;
      created_at: string;
      updated_at: string;
    };
  };
  onAccept?: (jobId: any) => void;
  onDecline?: (jobId: string) => void;
  onCounter?: (job: any) => void;
  onViewDetails?: (job: any) => void;
  onMessage?: (job: any) => void;
  isExpired?: boolean;
  loading?: boolean;
  variant?: 'available' | 'accepted' | 'expired';
}

export default JobCardProps;
