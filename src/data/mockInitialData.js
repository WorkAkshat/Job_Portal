// Job listings and workflow stage definitions only.
// No pre-filled candidate data — all candidates register at runtime.

export const JOB_LISTINGS = [
  {
    id: "RAJ-2026-001",
    title: "Gram Panchayat Executive Officer",
    department: "Panchayati Raj & Rural Development",
    district: "Jaipur",
    block: "Sanganer",
    openings: 14,
    salaryRange: "₹35,400 – ₹48,000 / month",
    minQualification: "Graduate (Any Stream) + RSCIT / Computer Diploma",
    ageLimit: "21 – 40 years",
    lastDate: "2026-10-15",
    postedDate: "2026-09-01",
    type: "Contractual",
    category: "Group B",
    description: "Responsible for village development planning, MNREGA oversight, public scheme implementation, and panchayat record maintenance at gram panchayat level.",
    responsibilities: [
      "Prepare gram panchayat annual development plan",
      "Oversee MNREGA job card issuance and wage disbursement",
      "Maintain birth, death, and marriage registration records",
      "Coordinate with Block Development Officer for scheme implementation"
    ]
  },
  {
    id: "RAJ-2026-002",
    title: "Panchayat Data Entry & IT Assistant",
    department: "Information Technology (Panchayat Wing)",
    district: "Jodhpur",
    block: "Mandore",
    openings: 28,
    salaryRange: "₹24,500 – ₹32,000 / month",
    minQualification: "BCA / B.Sc (IT) / 12th + COPA / RSCIT",
    ageLimit: "18 – 35 years",
    lastDate: "2026-10-20",
    postedDate: "2026-09-05",
    type: "Contractual (Agency)",
    category: "Group C",
    description: "Managing panchayat digital portals, citizen grievance entries, biometric attendance records, and Direct Benefit Transfer (DBT) verification at block level.",
    responsibilities: [
      "Operate ePanchayat and PRIASoft portals",
      "Enter daily attendance and generate MIS reports",
      "Assist citizens with Jan Aadhaar and DBT queries",
      "Maintain block-level digital records and backups"
    ]
  },
  {
    id: "RAJ-2026-003",
    title: "Block Rural Livelihood Coordinator",
    department: "Rajasthan Grameen Aajeevika Vikas Parishad (RGAVP)",
    district: "Udaipur",
    block: "Girwa",
    openings: 8,
    salaryRange: "₹38,000 – ₹52,000 / month",
    minQualification: "Post Graduate in Social Work / Rural Mgmt / MBA",
    ageLimit: "25 – 45 years",
    lastDate: "2026-10-25",
    postedDate: "2026-09-08",
    type: "Full Time Project",
    category: "Group A",
    description: "Empowering Self Help Groups (SHGs), facilitating micro-finance for rural artisans, and coordinating skill development camps across block area.",
    responsibilities: [
      "Form and strengthen SHGs and Village Organizations",
      "Facilitate bank linkage and credit access for SHG members",
      "Conduct skill mapping and livelihood training programmes",
      "Prepare block-level monthly progress reports for RGAVP"
    ]
  },
  {
    id: "RAJ-2026-004",
    title: "Junior Technical Assistant (Panchayat Engineering)",
    department: "Rural Development & Panchayati Engineering",
    district: "Kota",
    block: "Ladpura",
    openings: 12,
    salaryRange: "₹32,000 – ₹42,500 / month",
    minQualification: "Diploma / B.Tech Civil Engineering",
    ageLimit: "21 – 40 years",
    lastDate: "2026-10-18",
    postedDate: "2026-09-03",
    type: "Contractual (Agency)",
    category: "Group B",
    description: "Inspection of rural roads, panchayat bhawan construction, water harvesting structures, and geo-tagging of completed works under PMGSY / MNREGA.",
    responsibilities: [
      "Survey and estimate cost for rural road construction",
      "Supervise panchayat building and anganwadi centre works",
      "Geo-tag completed structures using government app",
      "Prepare measurement books and submit utilization certificates"
    ]
  },
  {
    id: "RAJ-2026-005",
    title: "Anganwadi Worker / Sahayika",
    department: "Women & Child Development (ICDS)",
    district: "Bikaner",
    block: "Nokha",
    openings: 45,
    salaryRange: "₹9,600 – ₹14,500 / month (Honorarium)",
    minQualification: "10th Pass / 12th Pass",
    ageLimit: "21 – 40 years",
    lastDate: "2026-10-30",
    postedDate: "2026-09-10",
    type: "Honorarium Based",
    category: "Group D",
    description: "Provide supplementary nutrition, health check-ups, immunization support, pre-school education and nutrition counselling at anganwadi centres in rural areas.",
    responsibilities: [
      "Maintain records of beneficiary children (0-6 years)",
      "Distribute supplementary nutrition to pregnant women",
      "Conduct home visits and immunization awareness drives",
      "Submit monthly progress report to CDPO office"
    ]
  }
];

export const RAJASTHAN_DISTRICTS = [
  "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara",
  "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur",
  "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu",
  "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand",
  "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
];

export const WORKFLOW_STAGES = [
  { id: 1, name: "Application", sub: "Online form submission", icon: "FiFileText" },
  { id: 2, name: "Screening", sub: "Shortlist / hold", icon: "FiSearch" },
  { id: 3, name: "Interview", sub: "Schedule & notify", icon: "FiCalendar" },
  { id: 4, name: "Selection", sub: "Decision & approval", icon: "FiUserCheck" },
  { id: 5, name: "Verification", sub: "Degree / documents", icon: "FiShield" },
  { id: 6, name: "Offer", sub: "Generate & send PDF", icon: "FiMail" },
  { id: 7, name: "Onboarding", sub: "Employee record", icon: "FiUserPlus" },
  { id: 8, name: "Attendance", sub: "Monthly entry", icon: "FiCheckSquare" },
  { id: 9, name: "Approval", sub: "Agency e-sign", icon: "FiEdit3" },
  { id: 10, name: "Payroll", sub: "Calculate & generate", icon: "FiDollarSign" },
  { id: 11, name: "Salary Release", sub: "Bulk processed", icon: "FiSend" },
  { id: 12, name: "MIS", sub: "Reports & audit", icon: "FiBarChart2" }
];
