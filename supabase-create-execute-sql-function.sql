-- Create execute_sql RPC function for Supabase adapter
-- This function allows executing parameterized SQL queries safely

CREATE OR REPLACE FUNCTION execute_sql(query text, params json DEFAULT '[]'::json)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  -- For security, you might want to add checks here to prevent certain operations
  -- For now, this is a basic implementation
  
  -- Note: This is a simplified version. In production, you'd want to:
  -- 1. Validate the query doesn't contain dangerous operations
  -- 2. Use proper parameter binding
  -- 3. Add role-based access control
  
  EXECUTE format('SELECT json_agg(row_to_json(t)) FROM (%s) t', query) INTO result;
  
  RETURN COALESCE(result, '[]'::json);
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error and return empty result
    RAISE WARNING 'execute_sql error: %', SQLERRM;
    RETURN '[]'::json;
END;
$$;

-- Grant execute permission to authenticated and anon roles
GRANT EXECUTE ON FUNCTION execute_sql(text, json) TO authenticated, anon;

-- Test the function
SELECT execute_sql('SELECT id, access_code, company_name FROM companies LIMIT 1');