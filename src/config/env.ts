import Config from 'react-native-config'

// Environment configuration object
export const ENV = {
  // API Configuration
  API: {
    BASE_URL: Config.API_BASE_URL,
    TIMEOUT: Config.API_TIMEOUT ? parseInt(Config.API_TIMEOUT, 10) : undefined,
    VERSION: Config.API_VERSION,
    ENDPOINTS: {
      LOGIN: '/api/login',
      REGISTER: '/api/register',
      USER_PROFILE: '/api/user/profile',
      CATEGORYLIST: '/api/get-category-list',
      SUBCATEGORYLIST: '/api/get-subcategory',
      SERVICE: '/api/get-service',
      BOOKINGS: '/api/save-booking',
      OTPSEND: '/api/send-otp',
      CODEVERIFY: '/api/verify-otp',
      FIXERDASHBOARD: '/api/fixer-dashboard'
    },
  },

  // App Configuration
  APP: {
    NAME: Config.APP_NAME,
    VERSION: Config.API_VERSION,
    BUILD_NUMBER: Config.BUILD_NUMBER,
  },

  // Environment
  ENVIRONMENT: {
    NODE_ENV: Config.NODE_ENV,
    IS_DEVELOPMENT: Config.IS_DEVELOPMENT === 'true',
    IS_PRODUCTION: Config.IS_PRODUCTION === 'true',
    IS_STAGING: Config.NODE_ENV === 'staging',
  },

  // Feature Flags
  FEATURES: {
    ANALYTICS: Config.ENABLE_ANALYTICS === 'true',
    CRASH_REPORTING: Config.ENABLE_CRASH_REPORTING === 'true',
    DEBUG_LOGGING: Config.ENABLE_DEBUG_LOGGING === 'true',
  },

  // Third-party Services
  SERVICES: {
    SENTRY_DSN: Config.SENTRY_DSN,
    GOOGLE_ANALYTICS_ID: Config.GOOGLE_ANALYTICS_ID,
  },

  // Development Settings
  DEBUG: {
    MODE: Config.DEBUG_MODE === 'true',
    LOG_LEVEL: Config.LOG_LEVEL,
  },

  KEY: {
    API_KEY: Config.API_KEY,
  }
};

// Helper functions
export const isDevelopment = () => ENV.ENVIRONMENT.IS_DEVELOPMENT;
export const isProduction = () => ENV.ENVIRONMENT.IS_PRODUCTION;
export const isStaging = () => ENV.ENVIRONMENT.IS_STAGING;

export const getApiUrl = (endpoint: string) => {
  // if (!ENV.API.BASE_URL) {
  //   throw new Error('API_BASE_URL is not configured in environment variables');
  // }
  return `${ENV.API.BASE_URL}${endpoint}`;
};

export const getFullApiUrl = (endpoint: string) => {
  if (!ENV.API.BASE_URL || !ENV.API.VERSION) {
    throw new Error('API_BASE_URL or API_VERSION is not configured in environment variables');
  }
  return `${ENV.API.BASE_URL}/api/${ENV.API.VERSION}${endpoint}`;
};

// Validation function
export const validateEnvironment = () => {
  const required = [
    'API_BASE_URL',
    'APP_NAME',
    'NODE_ENV',
  ] as const;

  const missing = required.filter(key => !Config[key as keyof typeof Config]);
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing);
  }

  return missing.length === 0;
};

export default ENV; 