# रोज़गार राजस्थान (Rozgar Rajasthan)
## Panchayati Raj Workforce Recruitment & Governance Portal
### Developed by: Optatech Innovation Private Limited
### Client Authority: Department of Panchayati Raj, Government of Rajasthan

---

## 1. Executive Summary & Project Overview

**Rozgar Rajasthan** is an enterprise-grade digital workforce recruitment, deployment, and payroll governance platform engineered specifically for the **Department of Panchayati Raj, Government of Rajasthan**.

Developed and operated by **Optatech Innovation Private Limited**, the platform replaces outdated manual hiring, fragmented district rosters, and slow paper-based payroll processes with a unified, transparent, and 100% auditable digital system across all **33 districts, 355+ Panchayat Samitis, and 11,280+ Gram Panchayats** in Rajasthan.

The portal provides an official, citizen-friendly interface styled strictly under the **Government of Rajasthan official design system** (Navy Blue `#003366`, Saffron `#FF9933`, Indian Green `#138808`, official Ashoka Lion crest, and Hon'ble Chief Minister dignitary presence).

---

## 2. Core Functional Workflows

### 2.1. Dual-Path Citizen Employment Model
The platform addresses the classic limitation of government recruitment portals through a dynamic **Dual-Path Citizen Architecture**:

```
                                    ┌────────────────────────────────────────────────────────┐
                                    │               Citizen Visits Portal                    │
                                    └──────────────────────────┬─────────────────────────────┘
                                                               │
                                         Does an active job opening match qualifications?
                                                               │
                              ┌────────────────────────────────┴────────────────────────────────┐
                              ▼                                                                 ▼
                            [YES]                                                             [NO]
               ┌──────────────────────────────┐                                ┌──────────────────────────────┐
               │    Apply Directly to Job     │                                │  Submit Resume to Talent Pool│
               └──────────────┬───────────────┘                                └──────────────┬───────────────┘
                              │                                                               │
               • 12-Digit Aadhaar UIDAI Check                                  • 12-Digit Aadhaar Verification
               • Instant OTP/Mobile Linking                                    • Upload Resume & Skill Set
               • Select Posting District & Block                               • Choose Preferred Districts & Wings
               • Generate Tracking ID (APP-XXXX)                               • Generate Talent Pool ID (POOL-XXXX)
                              │                                                               │
                              ▼                                                               ▼
               Candidate tracks 12-Stage Lifecycle                             Department/Optatech Admin Reviews
               (Screening → Interview → Offer)                                 Pool & Dispatches SMS/Call When Vacancy Opens
```

1. **Direct Job Application Flow (जब पद रिक्त हों):**
   - Candidates browse active vacancies categorized by technical, accounting, administrative, or engineering trades.
   - Clicking **"Apply Directly to Job"** initiates an Aadhaar-authenticated workflow.
   - Candidate selects target district, block, gram panchayat, inputs educational qualification, and submits.
   - An immutable tracking token (e.g. `APP-K3910A`) is generated, unlocking the **12-Stage Live Timeline Tracker**.

2. **Statewide Talent Pool & Resume Submission Flow (जब पद रिक्त न हों):**
   - If no current vacancies exist in the applicant's trade or home district, the candidate is **not turned away**.
   - Instead, the candidate clicks **"Submit Resume / Register Profile"** to deposit their resume, university marks, trade skills (RS-CIT, AutoCAD, Tally, Civil survey), and preferred posting districts into the **Central State Talent Pool**.
   - Generated Talent Pool ID (e.g. `POOL-MN82B`) registers the citizen.
   - Whenever the department opens new contractual positions, administrators can search the talent pool by district and skills, and click **"Contact Candidate"** to send immediate SMS/Email recruitment notifications.

---

## 3. Dedicated Role-Based Authentication System

To guarantee enterprise security and segregation of duties, the platform features **distinct authentication gateways**:

### 3.1. Returning Candidate Login (पूर्व पंजीकृत अभ्यर्थी लॉगिन)
- **Problem Solved:** Prevents candidates who have already registered from having to re-enter personal, Aadhaar, and educational details.
- **Workflow:** Candidates simply enter their registered 12-digit Aadhaar number or 10-digit mobile number.
- **Outcome:** Instantly restores their candidate session, loads all past applications, displays interview calls, offer letters, and enables one-click application to new posts.

### 3.2. Department Administrator Console (प्रशासनिक अधिकारी लॉगिन)
- **Access URL:** `/admin` or `/login?role=admin`
- **Authorized Personas:** State Nodal Officers, District Collectors, Panchayati Raj Directorate.
- **Capabilities:**
  - Complete 12-stage recruitment pipeline control (Shortlisting, Interview Scheduling, Selection Approval, Document Verification, Offer Letter Generation, Employee Onboarding).
  - **Talent Pool Resume Bank:** Review candidate resumes submitted when no jobs were open; search by district/skills and trigger direct outreach notifications.
  - **Statutory DBT Payroll Execution:** Execute bulk Direct Benefit Transfer salary disbursal with electronic UTR tracking numbers.
  - **Immutable Audit Trail:** Comprehensive event logging recording timestamps, actors, and IP hashes for RTI compliance.
- **Demo Credentials:** `admin@optatechinnovation.com` / `Admin@123` (Auto-fill supported).

### 3.3. Authorized Agency Partner Portal (एजेंसी पार्टनर लॉगिन)
- **Access URL:** `/agency` or `/login?role=agency`
- **Authorized Personas:** Optatech Partner Agencies, Field Operations Leads, District Manpower Contractors.
- **Capabilities:**
  - **Deployed Staff Roster:** View all onboarded employees across Rajasthan districts.
  - **Monthly Attendance Entry:** Input present days, paid leaves, and field remarks.
  - **Cryptographic Digital E-Sign:** Agency lead applies authorized digital e-signature to attendance sheets. Payroll computation is locked until this digital signature is affixed.
- **Demo Credentials:** `agency@optatechinnovation.com` / `Agency@123` (Auto-fill supported).

---

## 4. The 12-Stage Recruitment & Governance Lifecycle

Every contractual appointment is tracked across an immutable 12-stage workflow:

| Stage # | Lifecycle Milestone | Administrative & Legal Significance |
| :---: | :--- | :--- |
| **Stage 1** | **Application Submitted** | Citizen submits Aadhaar-verified form online; unique tracking ID issued. |
| **Stage 2** | **Scrutiny & Screening** | Automated eligibility check against minimum qualification and age criteria. |
| **Stage 3** | **Interview / Trade Test** | Candidate is notified of date, time, and District Collectorate venue. |
| **Stage 4** | **Selection & Approval** | Merit score (out of 100) recorded with panel review remarks. |
| **Stage 5** | **Document Verification** | Physical & electronic verification of Aadhaar, marksheets, and domicile. |
| **Stage 6** | **Offer Letter Generation** | Official contractual offer letter generated with designation and pay scale. |
| **Stage 7** | **Onboarded & Deployed** | Employee ID assigned (e.g. `OPT-EMP-XXXX`); candidate deployed to block/Panchayat. |
| **Stage 8** | **Monthly Attendance** | Field attendance logged by authorized partner agency. |
| **Stage 9** | **Agency Digital E-Sign** | Agency officer cryptographically signs attendance sheet for billing audit. |
| **Stage 10**| **Statutory Payroll** | Automated calculation of Basic, DA, HRA, EPF (12%), and TDS deductions. |
| **Stage 11**| **Direct Benefit Transfer** | Electronic salary transfer executed directly to Aadhaar-linked bank account with UTR. |
| **Stage 12**| **MIS & Audit Closure** | Final financial accounting and RTI-compliant audit log archive. |

---

## 5. Why This Project is Unique & Innovative

1. **Elimination of Ghost Candidates via Aadhaar Authentication:**
   - Traditional employment portals frequently suffer from duplicate applications, impersonation, and fraudulent registrations. Rozgar Rajasthan links every profile to a verified 12-digit Aadhaar UIDAI identity.

2. **Zero Paper Leakage & 100% Meritocracy:**
   - Screening, interview scores, and offer letter generation are processed purely through the centralized Optatech digital engine. Every administrative action creates an unalterable audit log entry.

3. **Cryptographic Agency E-Sign Before Payroll Disbursal:**
   - In conventional contractual systems, phantom workers can be billed by field contractors. Rozgar Rajasthan requires the designated agency lead to apply a digital e-signature to monthly attendance sheets before the Department Administrator can authorize payment.

4. **Integrated Direct Benefit Transfer (DBT):**
   - Salaries bypass intermediaries and are remitted directly to the worker's bank account with unique UTR transaction identifiers.

5. **No Candidate Left Behind (Active Openings + State Talent Pool):**
   - When a job exists, candidates apply directly. When no job exists, candidates deposit their resumes into the Talent Pool, ensuring the government has an on-demand, pre-verified candidate bank ready for immediate deployment.

6. **Continuous Information Broadcast (Slider-Free Ticker):**
   - High-priority government notifications are broadcast through a smooth, continuously moving marquee without awkward sliders or manual scrollbars.

---

## 6. Technology Stack Architecture

- **Client Framework:** React 18 with modern functional components and hooks (`useState`, `useEffect`, `useCallback`, `useMemo`).
- **Styling Architecture:** Pure Tailwind CSS supplemented with Government of Rajasthan design tokens (CSS variables for Navy Blue `#003366`, Saffron `#FF9933`, and India Green `#138808`).
- **Animations:** Framer Motion for smooth elevation transitions, plus high-performance CSS keyframe animations for the continuous marquee.
- **Iconography:** Lightweight React Feather Icons (`react-icons/fi`).
- **Build & Bundle Engine:** Vite v8 with sub-second HMR and optimized production bundling.
- **State Management & Persistence:** Centralized `WorkforceContext` providing full reactive state management with client-side `localStorage` persistence, simulating real backend persistence without database dependencies.

---

## 7. Verification & Testing Guide

| Persona | Test Objective | Steps to Perform |
| :--- | :--- | :--- |
| **Candidate (New)** | Register with Aadhaar | Go to `/apply` → Enter 12-digit Aadhaar → Enter Mobile/Email → Complete registration. |
| **Candidate (Returning)** | Log in without re-registering | Go to `/login` (Candidate Tab) → Enter registered Aadhaar → System immediately restores profile and applications. |
| **Candidate (Talent Pool)** | Submit resume when no job | Go to `/register` → Complete qualification and trade skills → Receive `POOL-XXXX` registration token. |
| **Agency Officer** | Log attendance & apply E-Sign | Go to `/agency` (or `/login?role=agency`) → Click 'Auto Fill' → Sign in → View Roster → Enter attendance → Click 'Apply Digital E-Sign'. |
| **Department Admin** | Review pipeline, talent pool & DBT | Go to `/admin` (or `/login?role=admin`) → Sign in → Advance candidate stages → Open 'Talent Pool' tab to contact applicants → Open 'Payroll' to execute bulk DBT release. |

---

*Document prepared by Optatech Innovation Private Limited for the Directorate of Panchayati Raj, Government of Rajasthan.*
