# Job Portal Backend

A complete backend API for a job portal (similar to Naukri.com) built with Node.js, Express, and SQLite.

---

## 🔧 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/dennis221/job-portal-backend.git
   cd job-portal-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file at project root:

   ```env
   PORT=3000
   SECRET_KEY=MY_SECRET_KEY
   ```

4. **Initialize the database**

   - Ensure SQLite is installed
   - Run the initialization script:
     ```bash
     node init-db.js
     ```
     This will create tables and seed initial data.

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3000`.

---

## 🗄️ Database Design Explanation

The SQLite database models core entities via these tables:

- **users**: authentication (id, email, password, userType)
- **job_seekers** & **employers**: profiles linked 1:1 to `users`
- **jobs**: postings by employers (employerId FK)
- **applications**: job applications (jobId, jobSeekerId, status)
- **resumes**: uploaded resume paths per jobSeeker
- **messages**: recruiter–candidate communications (senderId, recipientId)
- **company_reviews**: employee reviews per company
- **job_seeker_views**, **job_seeker_search_appearances**: analytics logs
- **job_views**: views per job for employer analytics
- **subscription_plans**: jobseeker & employer plan data

**Relationships & Constraints**:

- `user.id` → `job_seekers.id` or `employers.id`
- FKs enforce referential integrity
- Timestamps track creation and events
- JSON fields (e.g. plan features) stored as text

---

## 📚 API Documentation

All routes are prefixed with `/api`.

### 1. Authentication

| Method | Endpoint                       | Auth | Description            |
| ------ | ------------------------------ | ---- | ---------------------- |
| POST   | `/api/auth/jobseeker/register` | ❌   | Register new jobseeker |
| POST   | `/api/auth/employer/register`  | ❌   | Register new employer  |
| POST   | `/api/auth/login`              | ❌   | Login and receive JWT  |

### 2. Jobseeker Profile

| Method | Endpoint       | Auth         | Description        |
| ------ | -------------- | ------------ | ------------------ |
| GET    | `/api/profile` | ✅ Jobseeker | Get own profile    |
| PUT    | `/api/profile` | ✅ Jobseeker | Update own profile |

### 3. Employers & Jobs

| Method | Endpoint                                 | Auth        | Description                 |
| ------ | ---------------------------------------- | ----------- | --------------------------- |
| POST   | `/api/employer/jobs`                     | ✅ Employer | Create new job posting      |
| GET    | `/api/employer/jobs`                     | ✅ Employer | List own job postings       |
| GET    | `/api/employer/jobs/:jobId/applications` | ✅ Employer | View applications for a job |

### 4. Job Search

| Method | Endpoint           | Auth | Description     |
| ------ | ------------------ | ---- | --------------- |
| GET    | `/api/jobs/search` | ❌   | Search jobs     |
| GET    | `/api/jobs/:jobId` | ❌   | Get job details |

### 5. Applications

| Method | Endpoint                  | Auth         | Description               |
| ------ | ------------------------- | ------------ | ------------------------- |
| POST   | `/api/applications/apply` | ✅ Jobseeker | Apply to a job            |
| GET    | `/api/applications`       | ✅ Jobseeker | View own applications     |
| PUT    | `/api/applications/:id`   | ✅ Employer  | Update application status |

### 6. Messages

| Method | Endpoint             | Auth | Description       |
| ------ | -------------------- | ---- | ----------------- |
| POST   | `/api/messages/send` | ✅   | Send message      |
| GET    | `/api/messages`      | ✅   | Get user messages |

### 7. Resume Upload

| Method | Endpoint              | Auth         | Description           |
| ------ | --------------------- | ------------ | --------------------- |
| POST   | `/api/resumes/upload` | ✅ Jobseeker | Upload a resume       |
| GET    | `/api/resumes`        | ✅ Jobseeker | List uploaded resumes |

### 8. Analytics

| Method | Endpoint                             | Auth         | Description                      |
| ------ | ------------------------------------ | ------------ | -------------------------------- |
| GET    | `/api/analytics/profile-views`       | ✅ Jobseeker | Jobseeker profile view analytics |
| GET    | `/api/employer/analytics/job/:jobId` | ✅ Employer  | Employer job analytics           |

### 9. Company Reviews

| Method | Endpoint                            | Auth         | Description           |
| ------ | ----------------------------------- | ------------ | --------------------- |
| POST   | `/api/companies/:companyId/reviews` | ✅ Jobseeker | Submit company review |

### 10. Subscriptions

| Method | Endpoint                   | Auth | Description                      |
| ------ | -------------------------- | ---- | -------------------------------- |
| GET    | `/api/subscriptions/plans` | ❌   | Get available subscription plans |

---

## 💭 Assumptions Made

- JWT tokens expire in 2 hours.
- Only **jobseekers** can upload resumes and post reviews.
- Skills for matching and analytics are mocked/simplified.
- `features` arrays in subscription plans are stored as JSON text.
- No hard delete; entities use auto-increment IDs.
- Timestamps use UTC.

---

> © 2025 Job Portal Backend Team
