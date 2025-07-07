-- Update gallery table to support videos
ALTER TABLE gallery_images 
ADD COLUMN file_type TEXT DEFAULT 'image' CHECK (file_type IN ('image', 'video')),
ADD COLUMN file_size INTEGER,
ADD COLUMN duration INTEGER; -- for videos, duration in seconds

-- Rename table to be more generic
ALTER TABLE gallery_images RENAME TO gallery_items;

-- Update indexes
DROP INDEX IF EXISTS idx_gallery_images_created_at;
CREATE INDEX idx_gallery_items_created_at ON gallery_items(created_at DESC);
CREATE INDEX idx_gallery_items_type ON gallery_items(file_type);
