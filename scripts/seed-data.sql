-- Insert sample posts
INSERT INTO posts (title, summary, content, category, author, slug) VALUES
('Welcome to ABC Company', 'We are excited to announce the launch of our new website and services.', '<p>We are thrilled to welcome you to ABC Company. Our team has been working hard to bring you the best services and solutions.</p><p>Stay tuned for more updates and exciting announcements!</p>', 'News', 'Admin', 'welcome-to-abc-company'),
('New Product Launch', 'Introducing our latest innovation that will revolutionize the industry.', '<p>Today marks a significant milestone for ABC Company as we launch our groundbreaking new product.</p><p>This innovation represents months of research and development, and we believe it will transform how businesses operate.</p>', 'Updates', 'Product Team', 'new-product-launch'),
('Company Expansion', 'ABC Company is expanding to new markets and locations.', '<p>We are pleased to announce our expansion into three new markets this quarter.</p><p>This growth reflects our commitment to serving more customers and creating new opportunities.</p>', 'Announcements', 'CEO', 'company-expansion');

-- Insert sample gallery images
INSERT INTO gallery_images (url, alt_text, caption) VALUES
('/placeholder.svg?height=400&width=600', 'Modern office building', 'Our state-of-the-art headquarters'),
('/placeholder.svg?height=400&width=600', 'Team collaboration', 'Innovation happens through teamwork'),
('/placeholder.svg?height=400&width=600', 'Technology workspace', 'Cutting-edge technology at work'),
('/placeholder.svg?height=400&width=600', 'Conference room', 'Where great ideas come to life'),
('/placeholder.svg?height=400&width=600', 'Office interior', 'A space designed for creativity');

-- Insert sample jobs
-- INSERT INTO jobs (title, department, location, type, salary, description, requirements) VALUES
-- ('Senior Software Engineer', 'Engineering', 'San Francisco, CA', 'Full-time', '$120,000 - $160,000', 'We are looking for a Senior Software Engineer to join our growing engineering team. You will be responsible for designing, developing, and maintaining high-quality software solutions.', '["5+ years of software development experience", "Proficiency in JavaScript, Python, or Java", "Experience with cloud platforms (AWS, GCP, Azure)", "Strong problem-solving skills", "Bachelor''s degree in Computer Science or related field"]'),
-- ('Product Manager', 'Product', 'New York, NY', 'Full-time', '$100,000 - $140,000', 'Join our product team to help shape the future of our products. You will work closely with engineering, design, and business teams to deliver exceptional user experiences.', '["3+ years of product management experience", "Strong analytical and problem-solving skills", "Experience with agile development methodologies", "Excellent communication and leadership skills", "MBA or relevant degree preferred"]'),
-- ('UX Designer', 'Design', 'Remote', 'Full-time', '$80,000 - $110,000', 'We are seeking a talented UX Designer to create intuitive and engaging user experiences for our digital products.', '["3+ years of UX design experience", "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)", "Strong portfolio demonstrating user-centered design", "Experience with user research and testing", "Bachelor''s degree in Design or related field"]');

-- Insert sample notices
INSERT INTO notices (title, type, url) VALUES
('Holiday Schedule 2024', 'pdf', '/placeholder-document.pdf'),
('New Office Opening', 'image', '/placeholder.svg?height=600&width=800'),
('Safety Guidelines Update', 'pdf', '/placeholder-document.pdf');
