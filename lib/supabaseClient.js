import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xfpuyhysrraazaoacwkh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmcHV5aHlzcnJhYXphb2Fjd2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzgzMzEsImV4cCI6MjA1Mzc1NDMzMX0.Sk8ZIgOuLXZId0Jjz9GRTVYW00O5MXUZdjpEpYYiUPg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)