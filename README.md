# रोज़गार राजस्थान (Rozgar Rajasthan)
### Panchayati Raj Workforce Recruitment & Employment Governance Platform
**Initiative:** Department of Panchayati Raj, Government of Rajasthan  
**Developed & Managed by:** Optatech Innovation Private Limited  

---

## 🏛 Overview
**Rozgar Rajasthan** is an end-to-end digital recruitment, field workforce monitoring, and Direct Benefit Transfer (DBT) governance portal designed for the rural local bodies of Rajasthan (33 Districts, 355+ Panchayat Samitis, and 11,280+ Gram Panchayats).

The platform replaces manual tenders and paper registers with an Aadhaar-verified recruitment pipeline, continuous announcements marquee, separate role-based portals (Candidate, Agency, Admin), and automated statutory DBT payroll.

---

## 🌟 Key Features

1. **Dual-Path Citizen Model:**
   - **Direct Job Apply:** When job openings exist, candidates apply directly with Aadhaar verification and receive a tracking token (`APP-XXXX`) to track progress through a 12-stage lifecycle.
   - **State Talent Pool (Resume Submission):** When no matching openings exist in a district/trade, candidates submit their resume and skills. They receive a Talent Pool token (`POOL-XXXX`) and are contacted when openings open.

2. **Dedicated Role Portals & Authentication:**
   - **Candidate Portal:** One-click login with registered 12-digit Aadhaar / 10-digit Mobile (restores all applications and profiles without re-registering).
   - **Agency Portal (`/agency`):** Field partner login for monthly attendance entry and authorized cryptographic Digital E-Sign.
   - **Admin Portal (`/admin`):** State Nodal Officer console for candidate pipeline management, talent pool candidate outreach, and bulk DBT salary release.

3. **12-Stage Traceability Pipeline:**
   - Application Submitted $\rightarrow$ Scrutiny $\rightarrow$ Interview $\rightarrow$ Selection $\rightarrow$ Document Verification $\rightarrow$ Offer Letter $\rightarrow$ Onboarding $\rightarrow$ Monthly Attendance $\rightarrow$ Agency E-Sign $\rightarrow$ Statutory Payroll $\rightarrow$ DBT Disbursal $\rightarrow$ MIS Audit.

4. **Official Rajasthan Government Design System:**
   - Navy Blue (`#003366`), Saffron (`#FF9933`), and India Green (`#138808`).
   - Official Government of Rajasthan Ashoka Lion emblem & portrait of Hon'ble Chief Minister Shri Bhajan Lal Sharma.
   - Smooth continuous moving news marquee (no manual scrollbars/sliders).

---

## 🛠 Tech Stack
- **Framework:** React 18 + Vite v8
- **Styling:** Tailwind CSS + Vanilla CSS Govt Design Tokens
- **Icons & Motion:** React Icons (`fi`), Framer Motion
- **Persistence:** LocalStorage reactive client-side store via `WorkforceContext`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/WorkAkshat/Job_Portal.git

# Navigate to project directory
cd Job_Portal

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔐 Demo Credentials
- **Admin Console:** `admin@optatechinnovation.com` / `Admin@123`
- **Agency Partner:** `agency@optatechinnovation.com` / `Agency@123`
- **Candidate Login:** Any registered 12-digit Aadhaar number or 10-digit mobile number

---

## 📄 Documentation
For detailed architecture, governance compliance, and lifecycle flows, refer to [`PROJECT_DOCUMENTATION.md`](./PROJECT_DOCUMENTATION.md).

---
*Developed by Optatech Innovation Private Limited for the Directorate of Panchayati Raj, Government of Rajasthan.*
