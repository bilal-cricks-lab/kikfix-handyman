import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProps {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  user_type?: string;
  contact_number?: string;
  country_id?: number;
  state_id?: number;
  city_id?: number;
  provider_id?: number | null;
  address?: string;
  player_id?: string;
  status: number;
  display_name?: string;
  providertype_id?: number | null;
  is_featured?: number;
  time_zone?: string;
  last_notification_seen: string | null;
  email_verified_at?: string | null;
  deleted_at?: string | null;
  created_at?: string;
  updated_at?: string;
  login_type?: string | null;
  service_address_id?: number | null;
  uid: string | null;
  handymantype_id?: number | null;
  is_subscribe?: number;
  social_image: string | null;
  is_available?: number;
  designation?: string | null;
  last_online_time?: string | null;
  slots_for_all_services?: number;
  known_languages?: string | null;
  skills?: string | null;
  description?: string | null;
  why_choose_me?: string | null;
  is_email_verified?: number;
  language_option?: string;
  user_role?: string[];
  image?: string;
  is_verify_provider?: number;
}

interface UserArray {
  user: UserProps | null;
}

const userInitialState: UserArray = {
  user: null,
};

export const user_Slice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    clearUserData: state => {
      state.user = null;
    },
  },
});

export const {setUserData, clearUserData} = user_Slice.actions;

export default user_Slice.reducer;