# 👨‍💻 Coding Task Breakdown – Next.js Web App

---

## *1. Project Setup*

* [ ] Initialize Next.js project with TypeScript + TailwindCSS.
* [ ] Setup Supabase client (auth, DB, storage).
* [ ] Create .env for Supabase + AI keys.
* [ ] Configure ESLint + Prettier.
* [ ] Deploy starter app to Vercel.

---

## *2. Authentication & User Profile*

* [ ] Implement Supabase Auth (Google, GitHub, email/password).
* [ ] Create users table in Supabase (id, email, created\_at).
* [ ] Build /login and /signup pages with Supabase hooks.
* [ ] Add middleware for protected routes (/dashboard).
* [ ] Profile setup page:

  * [ ] Create profiles table (user\_id, name, role, salary, location, etc.).
  * [ ] UI form to collect preferences.
  * [ ] API route to save preferences to Supabase.

---

## *3. Resume Upload & Parsing*

* [ ] Create resumes table (user\_id, file\_url, parsed\_json).
* [ ] Build file upload UI (PDF/DOCX → Supabase storage).
* [ ] API route /api/parse-resume (send file → backend parser).
* [ ] Python service / Node lib: extract text + structured fields (skills, work history, education).
* [ ] Store parsed resume JSON in Supabase.
* [ ] UI: show parsed resume, allow manual edits.

---

## *4. Job Aggregation*

* [ ] Create jobs table (job\_id, title, company, location, jd, source\_url).
* [ ] Implement scraper service:

  * [ ] Google Jobs API / scraping pipeline.
  * [ ] LinkedIn scraping (mock for demo).
* [ ] API route /api/jobs/fetch to fetch & insert into Supabase.
* [ ] Filtering function to match jobs with user preferences.
* [ ] Job ranking logic (relevance score).
* [ ] Daily job selection: store top 5 jobs per user.

---

## *5. AI Resume Tailoring*

* [ ] Create tailored_resumes table (resume\_id, job\_id, tailored\_file\_url, score).
* [ ] API route /api/tailor-resume (JD + user resume → LLM prompt → tailored text).
* [ ] PDF generation (React-pdf / LaTeX pipeline).
* [ ] ATS scoring API integration.
* [ ] Store tailored resume + score in Supabase.
* [ ] UI: show tailored resume preview with ATS score.

---

## *6. Notifications*

* [ ] Create Supabase cron function to run daily pipeline (scrape → filter → tailor → notify).
* [ ] Setup SendGrid integration for email notifications.
* [ ] Build notification service:

  * [ ] Daily digest email: “5 new jobs matched for you.”
  * [ ] In-app notification component.

---

## *7. Dashboard*

* [ ] Build /dashboard page.
* [ ] Show job cards (title, company, location, match score).
* [ ] Add resume preview modal.
* [ ] “Apply” button → external job link.
* [ ] Status tracker: saved, tailored, applied.
* [ ] Filter/sort by job status or ATS score.

---

## *8. Subscription & Monetization*

* [ ] Setup RevenueCat project.
* [ ] Integrate RevenueCat SDK with Next.js.
* [ ] Create subscription plans: Free, Pro, Premium.
* [ ] Add usage tracking (resumes_generated per user).
* [ ] Restrict resume tailoring based on subscription tier.
* [ ] UI: Upgrade modal + subscription page.

---

## *9. Testing & QA*

* [ ] Unit tests (resume parser, job filter, resume tailoring).
* [ ] Integration tests (end-to-end job pipeline).
* [ ] UI tests (React Testing Library / Cypress).
* [ ] Error handling (failed parsing, AI timeout, scraping failure).

---

## *10. Hackathon Demo Prep*

* [ ] Seed DB with mock jobs + sample resumes.
* [ ] Create demo user flow with preloaded data.
* [ ] Build landing page with product pitch.
* [ ] Record demo video flow.
