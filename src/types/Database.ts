// The shape of the Supabase database, written by hand to match supabase/migrations/.
// Passing it to createClient makes every query typed: wrong column names or value
// types become TypeScript errors instead of runtime surprises.
// (Supabase can also generate this file with `supabase gen types typescript`.)
//
// These are `type` aliases, not `interface`s, on purpose: supabase-js checks that each row
// fits Record<string, unknown>, and only type aliases count (interfaces stay open to
// extension, so TypeScript won't assume they have no other keys).

export type MeasurementSessionRow = {
  id: string;
  user_id: string;
  started_at: string;
  duration_seconds: number;
  average_db: number;
  peak_db: number;
  dose_percent: number;
  created_at: string;
};

// Columns with a default in SQL are optional when inserting.
export type MeasurementSessionInsert = {
  id?: string;
  user_id?: string;
  started_at: string;
  duration_seconds: number;
  average_db: number;
  peak_db: number;
  dose_percent: number;
  created_at?: string;
};

export type Database = {
  public: {
    Tables: {
      measurement_sessions: {
        Row: MeasurementSessionRow;
        Insert: MeasurementSessionInsert;
        Update: Partial<MeasurementSessionInsert>;
        Relationships: [];
      };
    };
    // No views, functions or enums (yet); supabase-js still expects the keys to exist.
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
