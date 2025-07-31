declare module 'react-native-config' {
  export interface NativeConfig {
      API_KEY: any;
      LOG_LEVEL: any;
      DEBUG_MODE: string;
      GOOGLE_ANALYTICS_ID: any;
      SENTRY_DSN: any;
      ENABLE_DEBUG_LOGGING: string;
      ENABLE_CRASH_REPORTING: string;
      ENABLE_ANALYTICS: string;
      IS_PRODUCTION: string;
      IS_DEVELOPMENT: string;
      NODE_ENV: any;
      BUILD_NUMBER: any;
      APP_NAME: any;
      API_VERSION: any;
      API_BASE_URL: any;
      API_TIMEOUT: any;
      HOSTNAME?: string;
  }
  
  export const Config: NativeConfig
  export default Config
} 