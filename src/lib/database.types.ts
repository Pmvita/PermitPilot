export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      documents: {
        Row: {
          id: string;
          organization_id: string;
          project_id: string | null;
          title: string;
          document_type: string;
          summary: string | null;
          body: string;
          content: Json;
          generation_mode: string;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          project_id?: string | null;
          title: string;
          document_type: string;
          summary?: string | null;
          body: string;
          content?: Json;
          generation_mode?: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["documents"]["Insert"]>;
      };
      invoices: {
        Row: {
          id: string;
          organization_id: string;
          project_id: string | null;
          client: string;
          amount: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          project_id?: string | null;
          client: string;
          amount?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["invoices"]["Insert"]>;
      };
      organization_members: {
        Row: {
          id: string;
          organization_id: string;
          user_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          user_id: string;
          role?: string;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["organization_members"]["Insert"]
        >;
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          trade: string | null;
          website: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
          plan: string | null;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          trade?: string | null;
          website?: string | null;
          created_by: string;
          created_at?: string;
          updated_at?: string;
          plan?: string | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["organizations"]["Insert"]>;
      };
      permits: {
        Row: {
          id: string;
          organization_id: string;
          project_id: string | null;
          municipality: string | null;
          permit_type: string;
          status: string;
          due_date: string | null;
          missing_items: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          project_id?: string | null;
          municipality?: string | null;
          permit_type: string;
          status?: string;
          due_date?: string | null;
          missing_items?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["permits"]["Insert"]>;
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      project_files: {
        Row: {
          id: string;
          organization_id: string;
          project_id: string | null;
          bucket_id: string;
          storage_path: string;
          file_name: string;
          file_type: string | null;
          file_size: number | null;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          project_id?: string | null;
          bucket_id?: string;
          storage_path: string;
          file_name: string;
          file_type?: string | null;
          file_size?: number | null;
          uploaded_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["project_files"]["Insert"]>;
      };
      projects: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          client: string | null;
          location: string | null;
          type: string | null;
          status: string;
          budget: number | null;
          deadline: string | null;
          permit_progress: number;
          next_action: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          client?: string | null;
          location?: string | null;
          type?: string | null;
          status?: string;
          budget?: number | null;
          deadline?: string | null;
          permit_progress?: number;
          next_action?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
      subcontractors: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          trade: string | null;
          project_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          trade?: string | null;
          project_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["subcontractors"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
