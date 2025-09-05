declare module '@pusher/pusher-websocket-react-native' {
  export interface PusherEvent {
    eventName: string;
    data: any;
  }

  export interface PusherConfig {
    apiKey: string;
    cluster: string;
    useTLS?: boolean;
    authEndpoint?: string;
    auth?: {
      headers: {
        [key: string]: string;
      };
    };
  }

  export interface SubscribeOptions {
    channelName: string;
    onEvent: (event: PusherEvent) => void;
  }

  export interface UnsubscribeOptions {
    channelName: string;
  }

  export interface PusherInstance {
    init(config: PusherConfig): Promise<void>;
    connect(): Promise<void>;
    disconnect(): void;
    
    subscribe(options: SubscribeOptions): Promise<void>;
    unsubscribe(options: UnsubscribeOptions): Promise<void>;
    
    connection: {
      bind(event: string, callback: (data?: any) => void): void;
      state: string;
    };
  }

  export default class Pusher {
    static getInstance(): PusherInstance;
  }
}
