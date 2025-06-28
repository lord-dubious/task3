export interface Tweet {
  id: string;
  user_id: string;
  content: string;
  media_urls?: string[] | null;
  scheduled_for?: Date | string | null;
  status: 'draft' | 'scheduled' | 'posted' | 'failed';
  twitter_account_id?: string | null;
  agent_id?: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  engagement?: {
    likes: number;
    retweets: number;
    replies: number;
    impressions: number;
  };
}

export interface MessageExample {
  user: string;
  content: {
    text: string;
  };
}

export type TemplateType =
  | string
  | ((options: { state: any }) => string);

export interface Character {
  id?: string;
  name: string;
  username?: string;
  system_prompt?: string;
  templates?: {
    [key: string]: TemplateType;
  };
  bio?: string | string[];
  lore?: string[];
  message_examples?: MessageExample[][];
  post_examples?: string[];
  topics?: string[];
  adjectives?: string[];
  knowledge?: (string | { path: string; shared?: boolean })[];
  plugins?: string[];
  settings?: {
    [key: string]: string | boolean | number | Record<string, any>;
  };
  style_config?: {
    all?: string[];
    chat?: string[];
    post?: string[];
  };
}

export enum AgentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface Agent extends Character {
  id: string;
  user_id: string;
  enabled?: boolean;
  status?: AgentStatus;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface AIAgent {
  id: string;
  name: string;
  personality: string;
  tone: 'professional' | 'casual' | 'humorous' | 'inspirational' | 'educational';
  topics: string[];
  isActive: boolean;
}

export interface TwitterAccount {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  isConnected: boolean;
  followers: number;
  following: number;
  accessToken?: string;
  accessTokenSecret?: string;
}

export interface TwitterOAuthTokens {
  accessToken: string;
  accessTokenSecret: string;
  userId: string;
  screenName: string;
}

export interface ScheduleSettings {
  timezone: string;
  optimalTimes: string[];
  frequency: 'daily' | 'weekly' | 'custom';
  autoPost: boolean;
}

export interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
  size: number;
  uploaded?: boolean;
  url?: string;
}