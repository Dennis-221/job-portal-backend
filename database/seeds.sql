-- Users
INSERT INTO users (email, password, userType) VALUES
('john.doe@example.com', '$2b$10$hashedpassword123', 'jobseeker'),
('hr@techcorp.com', '$2b$10$hashedpassword456', 'employer');

-- Job Seekers
INSERT INTO job_seekers (id, name, mobile, workStatus, experienceYears, experienceMonths, currentLocation)
VALUES (1, 'John Doe', '+919876543210', 'experienced', 5, 6, "Hyd");

-- Employers
INSERT INTO employers (id, companyName, mobile, recruiterName, designation, companyWebsite)
VALUES (2, 'Tech Corp Ltd', '+919876543211', 'Sarah HR', 'HR Manager', 'www.techcorp.com');

-- Skills
INSERT INTO skills (name) VALUES ('Node.js'), ('React'), ('MongoDB'), ('AWS');

-- Jobs
INSERT INTO jobs (employerId, title, description, department, location, experienceMin, experienceMax, salaryMin, salaryMax, jobType, openings)
VALUES (2, 'Senior Software Engineer - Node.js', 'Looking for experienced Node.js dev', 'Engineering', 'Bangalore', 5, 8, 1500000, 2500000, 'full-time', 3);

-- Job Skills
INSERT INTO job_skills (jobId, skillId)
VALUES (1, 1), (1, 2), (1, 3);


-- ============================
-- 1. Employers & Job Seekers
-- (Assuming users/job_seekers/employers already seeded)
-- ============================

-- ============================
-- 2. JOBS
-- ============================
INSERT OR REPLACE INTO jobs
  (id, employerId, title, description, department, location,
   experienceMin, experienceMax, salaryMin, salaryMax,
   hideSalary, jobType, openings, postedOn)
VALUES
  (1, 2, 'Senior Node.js Developer', 'Develop and maintain Node.js microservices', 'Engineering', 'Bangalore', 3, 6, 800000, 1200000, 0, 'Full-time', 2, '2025-06-01'),
  (2, 2, 'Frontend Engineer (React)', 'Build React SPA for our dashboard', 'Product', 'Hyderabad', 2, 4, 600000, 900000, 0, 'Full-time', 1, '2025-06-05'),
  (3, 3, 'Data Analyst', 'Analyze big data sets to drive insights', 'Analytics', 'Pune', 1, 3, 500000, 700000, 1, 'Contract', 1, '2025-06-10');

-- ============================
-- 3. APPLICATIONS
-- ============================
INSERT OR REPLACE INTO applications
  (id, jobId, jobSeekerId, resumeId, coverLetter, status, appliedOn)
VALUES
  (1, 1, 1, 1, 'I have 5 years of Node.js experience.', 'applied',   '2025-06-02'),
  (2, 1, 2, 2, 'Excited to join your backend team.',       'under_review','2025-06-03'),
  (3, 2, 1, 1, 'React is my forte, happy to discuss.',     'shortlisted', '2025-06-06'),
  (4, 3, 3, 3, 'Strong background in SQL and Python.',     'rejected',    '2025-06-11');

-- ============================
-- 4. MESSAGES
-- ============================
INSERT OR REPLACE INTO messages
  (id, senderId, recipientId, recipientType, subject, message, jobId, sentAt)
VALUES
  -- Employer Sarah (userId=2) invites John (userId=1) for interview on job 1
  (1, 2, 1, 'jobseeker', 'Interview Invitation', 'Hi John, wed like to schedule an interview for the Node.js role.', 1, '2025-06-04T10:00:00Z'),
  -- John replies
  (2, 1, 2, 'employer',  'Re: Interview Invitation', 'Thank you! I am available next Monday.', 1, '2025-06-04T12:30:00Z'),
  -- Employer Rahul (userId=3) asks Data Analyst candidate (userId=3) a question
  (3, 3, 3, 'jobseeker', 'Question about availability', 'Are you open to a 6-month contract?', 3, '2025-06-12T09:15:00Z');

-- ============================
-- 5. COMPANY REVIEWS
-- ============================
INSERT OR REPLACE INTO company_reviews
  (id, companyId, jobSeekerId, overallRating, workLifeBalance, compensation, culture, careerGrowth,
   title, pros, cons, employmentStatus, jobTitle, yearsWorked, recommendToFriend, createdAt)
VALUES
  (1, 2, 1, 4, 4, 3, 5, 4,
   'Great place to work',
   'Excellent work culture and mentorship',
   'Could improve on pay raises',
   'current', 'Software Engineer', 2, 1, '2025-06-07'),
  (2, 2, 2, 5, 5, 4, 5, 5,
   'Outstanding team and benefits',
   'Very supportive managers',
   'Occasional long hours',
   'former', 'Senior Developer', 3, 1, '2025-06-08'),
  (3, 3, 3, 3, 3, 2, 3, 3,
   'Decent experience',
   'Good learning opportunities',
   'Workload can be high',
   'current', 'Data Analyst', 1, 0, '2025-06-13');
