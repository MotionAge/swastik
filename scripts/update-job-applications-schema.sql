-- Update job_applications table to allow null job_id (for when jobs are deleted)
ALTER TABLE job_applications 
ALTER COLUMN job_id DROP NOT NULL;

-- Add index for better performance on job_id queries
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id_null ON job_applications(job_id) WHERE job_id IS NULL;
