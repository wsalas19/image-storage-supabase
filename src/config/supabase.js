import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://zjfiouexnmcnwltbzgyi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZmlvdWV4bm1jbndsdGJ6Z3lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk2MTIxMTYsImV4cCI6MTk5NTE4ODExNn0.agdGMqcyWMoZ9n7dYUmoOP2-BNGGd9CWxuiP0d4XvVg"
);
