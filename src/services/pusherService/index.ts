import Pusher, { PusherInstance } from '@pusher/pusher-websocket-react-native';
import { getAuthToken } from '../../utils/fcm_token';

interface PusherConfig {
  apiKey: string;
  cluster: string;
  authEndpoint: string;
}

interface PusherEvent {
  eventName: string;
  data: any;
}

class PusherService {
  private pusher: PusherInstance | null = null;
  private config: PusherConfig;
  private isConnected = false;

  constructor(config: PusherConfig) {
    this.config = config;
  }

  async initialize(): Promise<PusherInstance> {
    try {
      const authToken = await getAuthToken();
      
      if (!authToken) {
        throw new Error('No authentication token available');
      }

      console.log('🚀 Initializing Pusher service...');

      // Initialize Pusher instance
      this.pusher = Pusher.getInstance();

      if (!this.pusher) {
        throw new Error('Failed to get Pusher instance');
      }

      // Initialize with configuration
      await this.pusher.init({
        apiKey: this.config.apiKey,
        cluster: this.config.cluster,
        useTLS: true,
        authEndpoint: this.config.authEndpoint,
        auth: {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        },
      });

      // Connect to Pusher
      await this.pusher.connect();

      this.setupConnectionHandlers();
      
      return this.pusher!;
    } catch (error) {
      console.error('❌ Failed to initialize Pusher:', error);
      throw error;
    }
  }

  private setupConnectionHandlers(): void {
    if (!this.pusher) return;

    this.pusher.connection.bind('connected', () => {
      console.log('✅ Pusher connected successfully');
      this.isConnected = true;
    });

    this.pusher.connection.bind('disconnected', () => {
      console.log('❌ Pusher disconnected');
      this.isConnected = false;
    });

    this.pusher.connection.bind('error', (err: any) => {
      console.error('❌ Pusher connection error:', err);
      this.isConnected = false;
    });

    this.pusher.connection.bind('state_change', (states: any) => {
      console.log('🔄 Pusher state change:', states);
    });
  }

  async subscribeToChannel(
    channelName: string, 
    eventName: string, 
    callback: (data: any) => void
  ): Promise<void> {
    if (!this.pusher) {
      throw new Error('Pusher not initialized. Call initialize() first.');
    }

    try {
      await this.pusher.subscribe({
        channelName,
        onEvent: (event: any) => {
          console.log(`📨 Event received on ${channelName}:`, event.eventName, event.data);
          
          if (event.eventName === eventName) {
            callback(event.data);
          }
        },
      });

      console.log(`✅ Successfully subscribed to ${channelName}`);

    } catch (error) {
      console.error(`❌ Failed to subscribe to ${channelName}:`, error);
      throw error;
    }
  }

  async unsubscribeFromChannel(channelName: string): Promise<void> {
    if (!this.pusher) return;

    try {
      await this.pusher.unsubscribe({ channelName });
      console.log(`✅ Unsubscribed from ${channelName}`);
    } catch (error) {
      console.error(`❌ Failed to unsubscribe from ${channelName}:`, error);
    }
  }

  disconnect(): void {
    if (this.pusher) {
      console.log('🔌 Disconnecting Pusher...');
      this.pusher.disconnect();
      this.pusher = null;
      this.isConnected = false;
    }
  }

  getConnectionState(): string {
    if (!this.pusher) return 'disconnected';
    return this.pusher.connection.state;
  }

  isPusherConnected(): boolean {
    return this.isConnected;
  }
}

// Default configuration
const defaultConfig: PusherConfig = {
  apiKey: 'd8f959cdefeb458660a2',
  cluster: 'ap2',
  authEndpoint: 'https://kikfix-com.stackstaging.com/broadcasting/auth',
};

// Export singleton instance
export const pusherService = new PusherService(defaultConfig);

// Export class for custom instances
export { PusherService };
export type { PusherConfig, PusherEvent };
