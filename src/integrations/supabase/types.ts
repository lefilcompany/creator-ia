[?25l
    Select a project:                                                                     
                                                                                          
  >  1. bkepebmxtyyfnssyowpn [name: Creator, org: iqyreeecokceiyoonbcz, region: sa-east-1]
                                                                                          
                                                                                          
    Ôåæ/k up ÔÇó Ôåô/j down ÔÇó / filter ÔÇó q quit ÔÇó ? more                                        
                                                                                          [0D[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[0D[2K [0D[2K[?25h[?1002l[?1003l[?1006lexport type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      brands: {
        Row: {
          brand_crisis: string | null
          brand_hashtags: string | null
          brand_inspiration: string | null
          brand_manual: number | null
          brand_mission: string | null
          brand_pillars: string | null
          created_at: string | null
          current_objective: string | null
          id: number
          important_dates: string | null
          influencers_action: number | null
          is_deleted: number | null
          name: string
          numeric_target: string | null
          reference_contents: string | null
          relevant_content: string | null
          restrictions: string | null
          team_id: number
          updated_at: string | null
          user_id: string
          value_proposition: string
        }
        Insert: {
          brand_crisis?: string | null
          brand_hashtags?: string | null
          brand_inspiration?: string | null
          brand_manual?: number | null
          brand_mission?: string | null
          brand_pillars?: string | null
          created_at?: string | null
          current_objective?: string | null
          id?: number
          important_dates?: string | null
          influencers_action?: number | null
          is_deleted?: number | null
          name: string
          numeric_target?: string | null
          reference_contents?: string | null
          relevant_content?: string | null
          restrictions?: string | null
          team_id: number
          updated_at?: string | null
          user_id: string
          value_proposition: string
        }
        Update: {
          brand_crisis?: string | null
          brand_hashtags?: string | null
          brand_inspiration?: string | null
          brand_manual?: number | null
          brand_mission?: string | null
          brand_pillars?: string | null
          created_at?: string | null
          current_objective?: string | null
          id?: number
          important_dates?: string | null
          influencers_action?: number | null
          is_deleted?: number | null
          name?: string
          numeric_target?: string | null
          reference_contents?: string | null
          relevant_content?: string | null
          restrictions?: string | null
          team_id?: number
          updated_at?: string | null
          user_id?: string
          value_proposition?: string
        }
        Relationships: [
          {
            foreignKeyName: "brands_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brands_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contents: {
        Row: {
          brand_id: number
          created_at: string | null
          feeling: string | null
          format: string | null
          id: number
          is_deleted: number | null
          is_promote: number | null
          main_message: string | null
          micro_result: string | null
          next_step: string | null
          persona_id: number | null
          response_ai: string | null
          team_id: number
          theme_id: number
          updated_at: string | null
          user_id: string
          visual_reference: number | null
        }
        Insert: {
          brand_id: number
          created_at?: string | null
          feeling?: string | null
          format?: string | null
          id?: number
          is_deleted?: number | null
          is_promote?: number | null
          main_message?: string | null
          micro_result?: string | null
          next_step?: string | null
          persona_id?: number | null
          response_ai?: string | null
          team_id: number
          theme_id: number
          updated_at?: string | null
          user_id: string
          visual_reference?: number | null
        }
        Update: {
          brand_id?: number
          created_at?: string | null
          feeling?: string | null
          format?: string | null
          id?: number
          is_deleted?: number | null
          is_promote?: number | null
          main_message?: string | null
          micro_result?: string | null
          next_step?: string | null
          persona_id?: number | null
          response_ai?: string | null
          team_id?: number
          theme_id?: number
          updated_at?: string | null
          user_id?: string
          visual_reference?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contents_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contents_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contents_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contents_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      personas: {
        Row: {
          age: number | null
          beliefs: string | null
          brand_id: number
          buy_journey: string | null
          challenge: string | null
          content_habit: string | null
          created_at: string | null
          favorite_voice: string | null
          gender: string | null
          id: number
          interest_trigger: string | null
          is_deleted: number | null
          location: string | null
          main_objective: string | null
          name: string
          position_degree: string | null
          team_id: number
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          beliefs?: string | null
          brand_id: number
          buy_journey?: string | null
          challenge?: string | null
          content_habit?: string | null
          created_at?: string | null
          favorite_voice?: string | null
          gender?: string | null
          id?: number
          interest_trigger?: string | null
          is_deleted?: number | null
          location?: string | null
          main_objective?: string | null
          name: string
          position_degree?: string | null
          team_id: number
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          beliefs?: string | null
          brand_id?: number
          buy_journey?: string | null
          challenge?: string | null
          content_habit?: string | null
          created_at?: string | null
          favorite_voice?: string | null
          gender?: string | null
          id?: number
          interest_trigger?: string | null
          is_deleted?: number | null
          location?: string | null
          main_objective?: string | null
          name?: string
          position_degree?: string | null
          team_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "personas_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "personas_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      planning: {
        Row: {
          add_info: string | null
          brand_id: number
          created_at: string | null
          id: number
          is_deleted: number | null
          platform: string | null
          posts_number: number | null
          response_ai: string | null
          team_id: number
          theme_id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          add_info?: string | null
          brand_id: number
          created_at?: string | null
          id?: number
          is_deleted?: number | null
          platform?: string | null
          posts_number?: number | null
          response_ai?: string | null
          team_id: number
          theme_id: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          add_info?: string | null
          brand_id?: number
          created_at?: string | null
          id?: number
          is_deleted?: number | null
          platform?: string | null
          posts_number?: number | null
          response_ai?: string | null
          team_id?: number
          theme_id?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "planning_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "planning_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "planning_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "planning_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          brands_limit: number
          content_limit: number
          created_at: string | null
          id: number
          is_deleted: number | null
          members_limit: number
          name: string
          personas_limit: number
          planning_limit: number
          price: number
          review_limit: number
          themes_limit: number
          updated_at: string | null
        }
        Insert: {
          brands_limit: number
          content_limit: number
          created_at?: string | null
          id?: number
          is_deleted?: number | null
          members_limit: number
          name: string
          personas_limit: number
          planning_limit: number
          price: number
          review_limit: number
          themes_limit: number
          updated_at?: string | null
        }
        Update: {
          brands_limit?: number
          content_limit?: number
          created_at?: string | null
          id?: number
          is_deleted?: number | null
          members_limit?: number
          name?: string
          personas_limit?: number
          planning_limit?: number
          price?: number
          review_limit?: number
          themes_limit?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          brand_id: number
          created_at: string | null
          ia_text: string | null
          id: number
          is_deleted: number | null
          response_ai: string | null
          team_id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          brand_id: number
          created_at?: string | null
          ia_text?: string | null
          id?: number
          is_deleted?: number | null
          response_ai?: string | null
          team_id: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          brand_id?: number
          created_at?: string | null
          ia_text?: string | null
          id?: number
          is_deleted?: number | null
          response_ai?: string | null
          team_id?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitations: {
        Row: {
          created_at: string | null
          id: number
          is_deleted: number | null
          status: number | null
          team_id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_deleted?: number | null
          status?: number | null
          team_id: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_deleted?: number | null
          status?: number | null
          team_id?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "solicitations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      team_plans: {
        Row: {
          created_at: string | null
          end_date: string
          id: number
          is_deleted: number | null
          plan_id: number
          team_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: number
          is_deleted?: number | null
          plan_id: number
          team_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: number
          is_deleted?: number | null
          plan_id?: number
          team_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_plans_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_plans_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: true
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          access_code: string
          created_at: string | null
          id: number
          is_deleted: number | null
          name_team: string
          updated_at: string | null
        }
        Insert: {
          access_code: string
          created_at?: string | null
          id?: number
          is_deleted?: number | null
          name_team: string
          updated_at?: string | null
        }
        Update: {
          access_code?: string
          created_at?: string | null
          id?: number
          is_deleted?: number | null
          name_team?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      themes: {
        Row: {
          add_info: string | null
          brand_id: number
          colors: string | null
          created_at: string | null
          description: string
          hashtags: string | null
          id: number
          is_deleted: number | null
          objectives: string | null
          team_id: number
          title: string
          universe_target: string | null
          updated_at: string | null
          voice_ai: string | null
        }
        Insert: {
          add_info?: string | null
          brand_id: number
          colors?: string | null
          created_at?: string | null
          description: string
          hashtags?: string | null
          id?: number
          is_deleted?: number | null
          objectives?: string | null
          team_id: number
          title: string
          universe_target?: string | null
          updated_at?: string | null
          voice_ai?: string | null
        }
        Update: {
          add_info?: string | null
          brand_id?: number
          colors?: string | null
          created_at?: string | null
          description?: string
          hashtags?: string | null
          id?: number
          is_deleted?: number | null
          objectives?: string | null
          team_id?: number
          title?: string
          universe_target?: string | null
          updated_at?: string | null
          voice_ai?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "themes_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "themes_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          city_user: string
          created_at: string | null
          email: string
          id: string
          is_deleted: number | null
          role_permission: string | null
          role_value: number | null
          state_user: string
          team_id: number | null
          updated_at: string | null
          user_name: string
        }
        Insert: {
          city_user: string
          created_at?: string | null
          email: string
          id: string
          is_deleted?: number | null
          role_permission?: string | null
          role_value?: number | null
          state_user: string
          team_id?: number | null
          updated_at?: string | null
          user_name: string
        }
        Update: {
          city_user?: string
          created_at?: string | null
          email?: string
          id?: string
          is_deleted?: number | null
          role_permission?: string | null
          role_value?: number | null
          state_user?: string
          team_id?: number | null
          updated_at?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
