export {};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_settings: {
        Row: {
          id: string;
          user_id: string;
          google_ai_api_key: string | null;
          twitter_credentials: Record<string, unknown> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          google_ai_api_key?: string | null;
          twitter_credentials?: Record<string, unknown> | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          google_ai_api_key?: string | null;
          twitter_credentials?: Record<string, unknown> | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      agents: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          username: string | null;
          system_prompt: string | null;
          bio: string[] | null;
          lore: string[] | null;
          message_examples: MessageExample[][] | null;
          post_examples: string[] | null;
          adjectives: string[] | null;
          topics: string[] | null;
          style_config: { all?: string[]; chat?: string[]; post?: string[]; } | null;
          enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          username?: string | null;
          system_prompt?: string | null;
          bio?: string[] | null;
          lore?: string[] | null;
          message_examples?: MessageExample[][] | null;
          post_examples?: string[] | null;
          adjectives?: string[] | null;
          topics?: string[] | null;
          style_config?: { all?: string[]; chat?: string[]; post?: string[]; } | null;
          enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          username?: string | null;
          system_prompt?: string | null;
          bio?: string[] | null;
          lore?: string[] | null;
          message_examples?: MessageExample[][] | null;
          post_examples?: string[] | null;
          adjectives?: string[] | null;
          topics?: string[] | null;
          style_config?: { all?: string[]; chat?: string[]; post?: string[]; } | null;
          enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      tweets: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          media_urls: string[] | null;
          scheduled_for: string | null;
          status: 'draft' | 'scheduled' | 'posted' | 'failed';
          twitter_account_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          media_urls?: string[] | null;
          scheduled_for?: string | null;
          status?: 'draft' | 'scheduled' | 'posted' | 'failed';
          twitter_account_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          media_urls?: string[] | null;
          scheduled_for?: string | null;
          status?: 'draft' | 'scheduled' | 'posted' | 'failed';
          twitter_account_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
