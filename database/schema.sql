-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    userType TEXT CHECK(userType IN ('jobseeker', 'employer')) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Job Seekers
CREATE TABLE IF NOT EXISTS job_seekers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    mobile TEXT,
    workStatus TEXT,
    experienceYears INTEGER,
    experienceMonths INTEGER,
    currentLocation TEXT,
    FOREIGN KEY(id) REFERENCES users(id)
);

-- Employers
CREATE TABLE IF NOT EXISTS employers (
    id INTEGER PRIMARY KEY,
    companyName TEXT,
    mobile TEXT,
    recruiterName TEXT,
    designation TEXT,
    companyWebsite TEXT,
    verificationStatus TEXT DEFAULT 'pending',
    FOREIGN KEY(id) REFERENCES users(id)
);

-- Jobs
CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employerId INTEGER,
    title TEXT,
    description TEXT,
    department TEXT,
    location TEXT,
    experienceMin INTEGER,
    experienceMax INTEGER,
    salaryMin INTEGER,
    salaryMax INTEGER,
    hideSalary BOOLEAN DEFAULT 0,
    jobType TEXT,
    openings INTEGER,
    postedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(employerId) REFERENCES employers(id)
);

-- Applications
CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jobId INTEGER,
    jobSeekerId INTEGER,
    resumeId INTEGER,
    coverLetter TEXT,
    status TEXT DEFAULT 'applied',
    appliedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(jobId) REFERENCES jobs(id),
    FOREIGN KEY(jobSeekerId) REFERENCES job_seekers(id)
);

-- Resumes
CREATE TABLE IF NOT EXISTS resumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jobSeekerId INTEGER,
    fileName TEXT,
    filePath TEXT,
    isPrimary BOOLEAN DEFAULT 0,
    uploadedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(jobSeekerId) REFERENCES job_seekers(id)
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE
);

-- Job Skills
CREATE TABLE IF NOT EXISTS job_skills (
    jobId INTEGER,
    skillId INTEGER,
    FOREIGN KEY(jobId) REFERENCES jobs(id),
    FOREIGN KEY(skillId) REFERENCES skills(id)
);

-- Work Experience
CREATE TABLE IF NOT EXISTS work_experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jobSeekerId INTEGER,
    company TEXT,
    designation TEXT,
    location TEXT,
    startDate TEXT,
    endDate TEXT,
    currentlyWorking BOOLEAN,
    responsibilities TEXT,
    FOREIGN KEY(jobSeekerId) REFERENCES job_seekers(id)
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    senderId INTEGER,
    recipientId INTEGER,
    subject TEXT,
    message TEXT,
    jobId INTEGER,
    sentOn DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(jobId) REFERENCES jobs(id)
);

-- Saved Jobs
CREATE TABLE IF NOT EXISTS saved_jobs (
    jobSeekerId INTEGER,
    jobId INTEGER,
    savedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(jobSeekerId, jobId),
    FOREIGN KEY(jobSeekerId) REFERENCES job_seekers(id),
    FOREIGN KEY(jobId) REFERENCES jobs(id)
);

-- Company Reviews
CREATE TABLE IF NOT EXISTS company_reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  companyId INTEGER,
  jobSeekerId INTEGER,
  overallRating INTEGER,
  workLifeBalance INTEGER,
  compensation INTEGER,
  culture INTEGER,
  careerGrowth INTEGER,
  title TEXT,
  pros TEXT,
  cons TEXT,
  employmentStatus TEXT,
  jobTitle TEXT,
  yearsWorked INTEGER,
  recommendToFriend BOOLEAN,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_seeker_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jobSeekerId INTEGER,
  employerId INTEGER,
  viewedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_seeker_search_appearances (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jobSeekerId INTEGER,
  employerId INTEGER,
  searchedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS job_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jobId INTEGER,
  viewedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJUeXBlIjoiam9ic2Vla2VyIiwiaWF0IjoxNzUxNjk5MTYyLCJleHAiOjE3NTE3MDYzNjJ9.Y_2ubF5rcJauvWHOxaQC096u71KHrFov-nrS5WnbSPo

-- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJUeXBlIjoiZW1wbG95ZXIiLCJpYXQiOjE3NTE3MDU4NDAsImV4cCI6MTc1MTcxMzA0MH0.oi0y2DSY35QGNUS0HDebd4871CYIr8pSK3hRRF9gyEo