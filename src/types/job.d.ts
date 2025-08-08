interface JobCardProps {
  job: {
    id: string;
    urgency_level: string;
    instruction: string;
    address: string;
    min_time: string;
    max_time: string;
    postedTime?: string;
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
    };
  };
  onAccept?: (jobId: any) => void;
  onDecline?: (jobId: string) => void;
  onCounter?: (job: any) => void;
  onViewDetails?: (job: any) => void;
  onMessage?: (job: any) => void;
  isExpired?: boolean;
};

export default JobCardProps;