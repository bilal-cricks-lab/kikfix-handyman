export interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
  type: 'home' | 'office' | 'other';
}

export interface TimingData {
  date: string;
  timeSlot: string;
  urgency: 'standard' | 'urgent' | 'emergency';
}