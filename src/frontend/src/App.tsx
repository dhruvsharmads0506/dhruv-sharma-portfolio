import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SkillCategory {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  skills: string[];
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  color: string;
}

interface Certificate {
  title: string;
  issuer: string;
  image: string;
}

interface Education {
  institution: string;
  degree: string;
  period: string;
  detail?: string;
}

interface Achievement {
  title: string;
  description: string;
  icon: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Programming",
    color: "#2563eb",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
    skills: ["Python", "C", "C++", "JavaScript"],
  },
  {
    name: "Web Development",
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    borderColor: "#ddd6fe",
    skills: ["HTML", "CSS", "React", "Node.js"],
  },
  {
    name: "Database",
    color: "#0891b2",
    bgColor: "#ecfeff",
    borderColor: "#a5f3fc",
    skills: ["MySQL", "SQL", "MongoDB"],
  },
  {
    name: "Artificial Intelligence",
    color: "#d97706",
    bgColor: "#fffbeb",
    borderColor: "#fde68a",
    skills: [
      "Machine Learning Basics",
      "Data Preprocessing",
      "Model Evaluation",
      "Prompt Engineering",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "TensorFlow (Basic)",
    ],
  },
  {
    name: "Security Concepts",
    color: "#dc2626",
    bgColor: "#fef2f2",
    borderColor: "#fecaca",
    skills: [
      "Penetration Testing",
      "Vulnerability Assessment",
      "Web Security Testing",
      "Google Dorking",
      "OWASP Top 10",
    ],
  },
  {
    name: "Core Subjects",
    color: "#059669",
    bgColor: "#ecfdf5",
    borderColor: "#a7f3d0",
    skills: [
      "Data Structures",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Cloud Computing",
    ],
  },
  {
    name: "Cybersecurity Tools",
    color: "#be185d",
    bgColor: "#fdf2f8",
    borderColor: "#fbcfe8",
    skills: [
      "Kali Linux",
      "Nmap",
      "Metasploit",
      "Wireshark",
      "Hash Identifier",
      "CeWL",
      "Crunch",
      "HTTrack",
    ],
  },
  {
    name: "Development Tools",
    color: "#1d4ed8",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
    skills: ["Git", "GitHub", "VS Code", "Postman"],
  },
  {
    name: "Other Tools",
    color: "#6d28d9",
    bgColor: "#f5f3ff",
    borderColor: "#ddd6fe",
    skills: ["Docker (Basic)", "Linux CLI", "Jupyter Notebook", "Google Colab"],
  },
];

const PROJECTS: Project[] = [
  {
    title: "TinyTRaIL",
    description:
      "Full Stack URL Shortener with JWT authentication, QR code generation, and SQL database. Clean UI with analytics dashboard.",
    tags: ["Node.js", "JWT", "QR Code", "SQL", "Full Stack"],
    github: "https://github.com/dhruvsharmads0506/Tinytrail-links",
    live: "https://tinytrail-links.netlify.app",
    color: "#2563eb",
  },
  {
    title: "CyberPort Scanner",
    description:
      "Python-based port scanner using raw sockets for network reconnaissance. Fast, efficient, and outputs detailed service info.",
    tags: ["Python", "Sockets", "Networking", "Cybersecurity"],
    github: "https://github.com/dhruvsharmads0506/cyberport-scanner",
    live: "https://cyberport-scanner.vercel.app/",
    color: "#dc2626",
  },
  {
    title: "Vulnerability Scanner",
    description:
      "Automated vulnerability scanning tool with detailed reporting. Identifies common security weaknesses in web applications.",
    tags: ["Python", "Security", "Automation", "Reporting"],
    color: "#7c3aed",
  },
];

const CERTIFICATES: Certificate[] = [
  {
    title: "Introduction to MongoDB",
    issuer: "MongoDB University",
    image: "/assets/uploads/image-7-1.png",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google Cloud / Simplilearn",
    image: "/assets/uploads/image-8-2.png",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    image: "/assets/uploads/image-10-4.png",
  },
  {
    title: "Cloud Security Fundamentals",
    issuer: "Palo Alto Networks",
    image: "/assets/uploads/image-11-5.png",
  },
  {
    title: "Certificate of Appreciation – Illuminate Bootcamp",
    issuer: "E-Cell IIT Bombay",
    image: "/assets/uploads/image-13-7.png",
  },
  {
    title: "Oracle Certified Foundations Associate",
    issuer: "Oracle",
    image:
      "https://res.cloudinary.com/dsdpibv4k/image/upload/v1773659248/1761759975026_ydg84y.jpg",
  },
  {
    title: "Workshop Completion Certificate",
    issuer: "Softpro India Computer Technologies (in collaboration with AKTU)",
    image:
      "https://res.cloudinary.com/dsdpibv4k/image/upload/v1773659323/1759074618666_ycjxsb.jpg",
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Cisco Networking Academy / EduSkills",
    image:
      "https://res.cloudinary.com/dsdpibv4k/image/upload/v1773659391/1755012919238_xje94p.jpg",
  },
  {
    title: "AI-ML Virtual Internship",
    issuer: "EduSkills",
    image:
      "https://res.cloudinary.com/dsdpibv4k/image/upload/v1773659451/1747072006316_lndclg.jpg",
  },
  {
    title: "Network Security Fundamentals",
    issuer: "Cisco Networking Academy",
    image:
      "https://res.cloudinary.com/dsdpibv4k/image/upload/v1773659434/1742046613759_jit0mm.jpg",
  },
];

const EDUCATION: Education[] = [
  {
    institution: "GL Bajaj Group of Institutions",
    degree: "B.Tech CSE AI – Honours in Cybersecurity",
    period: "2023 – 2027",
    detail: "CGPA: 8+",
  },
  {
    institution: "Aviraj World School",
    degree: "Senior Secondary (12th)",
    period: "2022 – 2023",
  },
  {
    institution: "RDS Public School",
    degree: "Secondary (10th)",
    period: "Until 2021",
  },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Smart India Hackathon 2025",
    description: "Team Lead – Internal Round Qualified",
    icon: "🏆",
  },
  {
    title: "TryHackMe & Hack The Box",
    description: "Practiced cybersecurity labs; hands-on pentesting experience",
    icon: "🔐",
  },
  {
    title: "PortSwigger Web Security",
    description:
      "Practiced web security labs covering OWASP Top 10 vulnerabilities",
    icon: "🕷️",
  },
  {
    title: "National Service Scheme (NSS)",
    description: "Active member contributing to community service initiatives",
    icon: "🤝",
  },
  {
    title: "Rotaract Club",
    description: "Member – GL Bajaj chapter, community & leadership activities",
    icon: "🌐",
  },
  {
    title: "Shrinik Club",
    description: "Technical club member participating in workshops and events",
    icon: "⚡",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      role="img"
      aria-label="Sun"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      role="img"
      aria-label="Moon"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label="GitHub"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label="LinkedIn"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label="Instagram"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      role="img"
      aria-label="Email"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Slideshow auto-advance
  const nextSlide = useCallback(() => {
    setSlideIndex((i) => (i + 1) % CERTIFICATES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setSlideIndex((i) => (i - 1 + CERTIFICATES.length) % CERTIFICATES.length);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 3500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextSlide]);

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mjgagljk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  // Styles
  const bg = isDark ? "#020617" : "#eef1fb";
  const fg = isDark ? "#e2e8f0" : "#1e293b";
  const cardBg = isDark ? "#0f172a" : "#ffffff";
  const cardBorder = isDark ? "#00e5a833" : "#e2e8f0";
  const mutedFg = isDark ? "#94a3b8" : "#64748b";
  const accent = isDark ? "#00e5a8" : "#2563eb";
  const accentViolet = isDark ? "#3b82f6" : "#7c3aed";
  const navBg = isDark ? "rgba(2,6,23,0.97)" : "rgba(238,241,251,0.92)";
  const inputBg = isDark ? "#0b1120" : "#f8fafc";
  const inputBorder = isDark ? "#00e5a84d" : "#cbd5e1";
  const badgeBg = isDark ? "#00e5a81a" : undefined;
  const badgeFg = isDark ? "#00e5a8" : undefined;

  const sectionTitle = (text: string) => (
    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      {isDark && (
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#00e5a8",
            fontSize: "0.78rem",
            letterSpacing: "0.08em",
            opacity: 0.7,
            marginBottom: "0.5rem",
          }}
        >
          {">"} cat ./{text.toLowerCase().replace(/ /g, "_")}/*
        </p>
      )}
      <h2
        style={{
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: 700,
          color: fg,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        {isDark ? (
          <span>
            <span style={{ color: "#00e5a8" }}>[</span>
            {text}
            <span style={{ color: "#00e5a8" }}>]</span>
          </span>
        ) : (
          text
        )}
      </h2>
      <div
        style={{
          width: isDark ? 80 : 60,
          height: 3,
          background: isDark
            ? "linear-gradient(90deg, #00e5a8, #3b82f6)"
            : `linear-gradient(90deg, ${accent}, ${accentViolet})`,
          margin: "0.75rem auto 0",
          borderRadius: 4,
          boxShadow: isDark ? "0 0 10px #00e5a855" : "none",
        }}
      />
    </div>
  );

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Education", href: "#education" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: isDark
          ? "linear-gradient(135deg, #020617 0%, #0b1120 100%)"
          : bg,
        color: fg,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        transition: "background 0.4s, color 0.4s",
        position: "relative",
      }}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: navBg,
          backdropFilter: "blur(12px)",
          borderBottom: isDark
            ? "1px solid rgba(0,229,168,0.12)"
            : `1px solid ${cardBorder}`,
          boxShadow: isDark ? "0 1px 20px rgba(0,0,0,0.5)" : "none",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo */}
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.2rem",
              color: fg,
              letterSpacing: "-0.02em",
            }}
          >
            Dhruv <span style={{ color: accent }}>Sharma</span>
          </span>

          {/* Desktop nav */}
          <div
            className="hidden md:flex"
            style={{ gap: "1.5rem", alignItems: "center" }}
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-ocid={`nav.${l.label.toLowerCase()}.link`}
                style={{
                  color: mutedFg,
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.color = accent;
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.color = mutedFg;
                }}
              >
                {l.label}
              </a>
            ))}
            {/* Dark mode toggle */}
            <button
              type="button"
              data-ocid="nav.dark_mode.toggle"
              onClick={() => setIsDark((d) => !d)}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: `2px solid ${isDark ? "#00e5a8" : accent}`,
                background: isDark ? "#00e5a820" : "#eff6ff",
                color: isDark ? "#00e5a8" : accent,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
                fontSize: "1.1rem",
              }}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 0.4s",
                  transform: isDark ? "rotate(360deg)" : "rotate(0deg)",
                }}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            className="flex md:hidden"
          >
            <button
              type="button"
              data-ocid="nav.dark_mode.toggle"
              onClick={() => setIsDark((d) => !d)}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: `2px solid ${isDark ? "#00e5a8" : accent}`,
                background: isDark ? "#00e5a820" : "#eff6ff",
                color: isDark ? "#00e5a8" : accent,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              type="button"
              data-ocid="nav.menu.toggle"
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: fg,
                fontSize: "1.5rem",
                padding: "4px",
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              background: navBg,
              borderTop: `1px solid ${cardBorder}`,
              padding: "1rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-ocid={`nav.mobile.${l.label.toLowerCase()}.link`}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: fg,
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section
        id="about"
        style={{
          paddingTop: 100,
          paddingBottom: 80,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "100px 1.5rem 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Profile photo */}
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            overflow: "hidden",
            border: `4px solid ${accent}`,
            boxShadow: isDark
              ? `0 0 0 4px #020617, 0 0 30px ${accent}55`
              : `0 0 0 4px #eef1fb, 0 8px 30px ${accent}33`,
            marginBottom: "2rem",
            flexShrink: 0,
          }}
          className={isDark ? "profile-photo" : ""}
        >
          <img
            src="https://res.cloudinary.com/dsdpibv4k/image/upload/v1773659089/1_xdtocg.jpg"
            alt="Dhruv Sharma"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "0.5rem",
            letterSpacing: "-0.03em",
            color: fg,
          }}
        >
          Dhruv <span style={{ color: accent }}>Sharma</span>
        </h1>

        {/* Title */}
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            fontWeight: 500,
            color: isDark ? "#00e5a8" : accentViolet,
            marginBottom: "1rem",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {isDark && <span style={{ color: "#00e5a8" }}>&gt; </span>}
          Cybersecurity Student &amp; Developer
        </p>

        {/* Bio */}
        <p
          style={{
            maxWidth: 600,
            color: mutedFg,
            fontSize: "1rem",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          B.Tech CSE AI student with a specialization in Cybersecurity at GL
          Bajaj Group of Institutions. Passionate about penetration testing, web
          security, machine learning, and building real-world tools.
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { label: "Projects", value: "3+" },
            { label: "Certifications", value: "5+" },
            { label: "CGPA", value: "8+" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: accent,
                  lineHeight: 1,
                  textShadow: isDark ? `0 0 12px ${accent}88` : "none",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: mutedFg, marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="#projects"
            data-ocid="hero.view_projects.button"
            style={{
              background: accent,
              color: isDark ? "#020617" : "#fff",
              padding: "0.65rem 1.5rem",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "all 0.25s",
              boxShadow: isDark
                ? `0 0 12px ${accent}55, 0 0 24px ${accent}22`
                : "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-3px)";
              if (isDark)
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  `0 0 22px ${accent}99, 0 0 44px ${accent}44`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
              if (isDark)
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  `0 0 12px ${accent}55, 0 0 24px ${accent}22`;
            }}
          >
            View Projects
          </a>
          <a
            href="https://drive.google.com/file/d/1jnmXAN54fRsAsqncSWwg1_90ARLEGKTu/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.download_resume.button"
            style={{
              background: "transparent",
              color: accent,
              padding: "0.65rem 1.5rem",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              border: `2px solid ${accent}`,
              transition: "all 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = accent;
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = accent;
            }}
          >
            Download Resume
          </a>
          <a
            href="#contact"
            data-ocid="hero.contact.button"
            style={{
              background: accentViolet,
              color: "#fff",
              padding: "0.65rem 1.5rem",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
            }}
          >
            Contact Me
          </a>
          <a
            href="https://www.instagram.com/dhruv_s_0506"
            target="_blank"
            rel="noreferrer"
            data-ocid="hero.instagram.button"
            style={{
              background:
                "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              color: "#fff",
              padding: "0.65rem 1.5rem",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
            }}
          >
            Instagram
          </a>
        </div>
      </section>

      {/* ── Professional Summary ── */}
      <section
        style={{
          background: isDark ? "#0f172a" : "#fff",
          borderTop: `1px solid ${cardBorder}`,
          borderBottom: `1px solid ${cardBorder}`,
          padding: "4rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
              color: fg,
              marginBottom: "1rem",
            }}
          >
            Professional Summary
          </h2>
          <div
            style={{
              width: 50,
              height: 3,
              background: `linear-gradient(90deg, ${accent}, ${accentViolet})`,
              margin: "0 auto 1.5rem",
              borderRadius: 4,
            }}
          />
          <p style={{ color: mutedFg, lineHeight: 1.85, fontSize: "1.05rem" }}>
            Cybersecurity-focused B.Tech student with hands-on experience in
            penetration testing, vulnerability assessment, web security, and
            machine learning. Actively building real-world tools, practicing on
            platforms like TryHackMe, Hack The Box, and PortSwigger, and leading
            teams in hackathons. Passionate about bridging the gap between
            offensive security and modern software development.
          </p>
        </div>
      </section>

      {/* ── Skills ── */}
      <section
        id="skills"
        style={{ padding: "5rem 1.5rem", maxWidth: 1100, margin: "0 auto" }}
      >
        {sectionTitle("Technical Skills")}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              style={{
                background: isDark ? "#0f172a" : cardBg,
                border: `1px solid ${isDark ? "#00e5a820" : cat.borderColor}`,
                borderRadius: 12,
                padding: "1.25rem",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  `0 8px 24px ${isDark ? "#00e5a820" : `${cat.color}22`}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  color: isDark ? "#00e5a8" : cat.color,
                  marginBottom: "0.85rem",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase" as const,
                  fontSize: "0.8rem",
                }}
              >
                {cat.name}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      background: isDark ? badgeBg : cat.bgColor,
                      color: isDark ? badgeFg : cat.color,
                      border: `1px solid ${isDark ? "#00e5a833" : cat.borderColor}`,
                      borderRadius: 20,
                      padding: "0.25rem 0.7rem",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section
        id="projects"
        style={{
          background: isDark ? "#0b1120" : "#f4f7ff",
          padding: "5rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {sectionTitle("Projects")}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                data-ocid={`projects.item.${i + 1}`}
                style={{
                  background: isDark ? "rgba(15,23,42,0.85)" : cardBg,
                  backdropFilter: isDark ? "blur(12px)" : "none",
                  WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
                  border: isDark
                    ? "1px solid rgba(0,229,168,0.15)"
                    : `1px solid ${cardBorder}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  transition:
                    "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = isDark
                    ? "0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,229,168,0.15)"
                    : `0 12px 32px ${p.color}22`;
                  if (isDark)
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(0,229,168,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  if (isDark)
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(0,229,168,0.15)";
                }}
              >
                {/* Color bar */}
                <div
                  style={{
                    height: 5,
                    background: isDark
                      ? "linear-gradient(90deg, #00e5a8, #3b82f6)"
                      : `linear-gradient(90deg, ${p.color}, ${p.color}99)`,
                  }}
                />
                <div style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      color: isDark ? "#00e5a8" : p.color,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      color: mutedFg,
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      marginBottom: "1rem",
                    }}
                  >
                    {p.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.35rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: isDark
                            ? "rgba(0,229,168,0.06)"
                            : "#f1f5f9",
                          color: isDark ? "#00e5a8" : "#475569",
                          border: isDark
                            ? "1px solid rgba(0,229,168,0.25)"
                            : "none",
                          borderRadius: isDark ? 9999 : 6,
                          padding: "0.2rem 0.6rem",
                          fontSize: "0.75rem",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {(p.github || p.live) && (
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          data-ocid={`projects.github.button.${i + 1}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            color: isDark ? "#00e5a8" : "#475569",
                            textDecoration: "none",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color =
                              accent;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color =
                              isDark ? "#00e5a8" : "#475569";
                          }}
                        >
                          <GithubIcon /> GitHub
                        </a>
                      )}
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          data-ocid={`projects.live.button.${i + 1}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            color: "#fff",
                            background: isDark ? "#00e5a8" : p.color,
                            textDecoration: "none",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            padding: "0.35rem 0.85rem",
                            borderRadius: 6,
                            transition: "opacity 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLAnchorElement
                            ).style.opacity = "0.85";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLAnchorElement
                            ).style.opacity = "1";
                          }}
                        >
                          ↗ Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section
        id="certifications"
        style={{ padding: "5rem 1.5rem", maxWidth: 1100, margin: "0 auto" }}
      >
        {sectionTitle("Certifications")}
        <div
          style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slide */}
          <div
            style={{
              background: isDark ? "#0f172a" : cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: isDark ? "0 0 30px #00e5a811" : "0 8px 32px #2563eb11",
            }}
          >
            <div
              style={{
                aspectRatio: "16/9",
                position: "relative",
                background: isDark ? "#000" : "#f8fafc",
                overflow: "hidden",
              }}
            >
              {CERTIFICATES.map((cert, i) => (
                <div
                  key={cert.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: i === slideIndex ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Info bar */}
            <div
              style={{
                padding: "1rem 1.5rem",
                borderTop: `1px solid ${cardBorder}`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: isDark ? "#00e5a8" : accent,
                  fontSize: "1rem",
                  marginBottom: "0.25rem",
                }}
              >
                {CERTIFICATES[slideIndex].title}
              </div>
              <div style={{ color: mutedFg, fontSize: "0.85rem" }}>
                {CERTIFICATES[slideIndex].issuer}
              </div>
            </div>
          </div>

          {/* Arrow controls */}
          <button
            type="button"
            data-ocid="certifications.pagination_prev"
            onClick={() => {
              prevSlide();
              setIsPaused(true);
            }}
            style={{
              position: "absolute",
              left: -20,
              top: "40%",
              transform: "translateY(-50%)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `2px solid ${isDark ? "#00e5a8" : accent}`,
              background: isDark ? "#0f172a" : "#fff",
              color: isDark ? "#00e5a8" : accent,
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              zIndex: 10,
            }}
          >
            ‹
          </button>
          <button
            type="button"
            data-ocid="certifications.pagination_next"
            onClick={() => {
              nextSlide();
              setIsPaused(true);
            }}
            style={{
              position: "absolute",
              right: -20,
              top: "40%",
              transform: "translateY(-50%)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `2px solid ${isDark ? "#00e5a8" : accent}`,
              background: isDark ? "#0f172a" : "#fff",
              color: isDark ? "#00e5a8" : accent,
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              zIndex: 10,
            }}
          >
            ›
          </button>

          {/* Dot navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1.25rem",
            }}
          >
            {CERTIFICATES.map((_, i) => (
              <button
                type="button"
                key={CERTIFICATES[i].title}
                data-ocid={`certifications.dot.toggle.${i + 1}`}
                onClick={() => {
                  setSlideIndex(i);
                  setIsPaused(true);
                }}
                style={{
                  width: i === slideIndex ? 24 : 10,
                  height: 10,
                  borderRadius: 20,
                  border: "none",
                  background:
                    i === slideIndex
                      ? isDark
                        ? "#00e5a8"
                        : accent
                      : isDark
                        ? "#1e3a5f"
                        : "#cbd5e1",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section
        id="education"
        style={{
          background: isDark ? "#0b1120" : "#f4f7ff",
          padding: "5rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {sectionTitle("Education")}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {EDUCATION.map((edu, i) => (
              <div
                key={edu.institution}
                data-ocid={`education.item.${i + 1}`}
                style={{
                  background: isDark ? "#0f172a" : cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 12,
                  padding: "1.5rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateX(6px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateX(0)";
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: isDark ? "#00e5a820" : `${accent}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  🎓
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontWeight: 700,
                      color: isDark ? "#00e5a8" : accent,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {edu.institution}
                  </h3>
                  <p
                    style={{
                      color: fg,
                      fontSize: "0.95rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {edu.degree}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ color: mutedFg, fontSize: "0.85rem" }}>
                      {edu.period}
                    </span>
                    {edu.detail && (
                      <span
                        style={{
                          background: isDark ? "#00e5a820" : `${accent}15`,
                          color: isDark ? "#00e5a8" : accent,
                          borderRadius: 20,
                          padding: "0.2rem 0.7rem",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        {edu.detail}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Achievements ── */}
      <section
        id="achievements"
        style={{ padding: "5rem 1.5rem", maxWidth: 1100, margin: "0 auto" }}
      >
        {sectionTitle("Achievements & Activities")}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {ACHIEVEMENTS.map((ach, i) => (
            <div
              key={ach.title}
              data-ocid={`achievements.item.${i + 1}`}
              style={{
                background: isDark ? "rgba(15,23,42,0.8)" : cardBg,
                backdropFilter: isDark ? "blur(8px)" : "none",
                WebkitBackdropFilter: isDark ? "blur(8px)" : "none",
                border: isDark
                  ? "1px solid rgba(0,229,168,0.12)"
                  : `1px solid ${cardBorder}`,
                borderRadius: 12,
                padding: "1.25rem",
                display: "flex",
                gap: "0.85rem",
                alignItems: "flex-start",
                transition:
                  "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = isDark
                  ? "0 8px 24px rgba(0,0,0,0.5), 0 0 16px rgba(0,229,168,0.12)"
                  : `0 8px 24px ${accent}22`;
                if (isDark)
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(0,229,168,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "1.75rem", lineHeight: 1 }}>
                {ach.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontWeight: 700,
                    color: isDark ? "#00e5a8" : fg,
                    fontSize: "0.95rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {ach.title}
                </h3>
                <p
                  style={{
                    color: mutedFg,
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                  }}
                >
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        style={{
          background: isDark ? "#0b1120" : "#f4f7ff",
          padding: "5rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {sectionTitle("Get In Touch")}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Contact info */}
            <div
              style={{
                background: isDark ? "#0f172a" : cardBg,
                border: `1px solid ${cardBorder}`,
                borderRadius: 14,
                padding: "2rem",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  color: isDark ? "#00e5a8" : accent,
                  marginBottom: "1.5rem",
                  fontSize: "1.1rem",
                }}
              >
                Contact Info
              </h3>
              {[
                {
                  icon: "📞",
                  label: "Phone",
                  value: "+91 7878309814",
                  href: "tel:+917878309814",
                },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "dhruvsharmads0506@gmail.com",
                  href: "mailto:dhruvsharmads0506@gmail.com",
                },
                {
                  icon: "📍",
                  label: "Location",
                  value: "Bhiwadi, Rajasthan, India",
                },
                {
                  icon: "💼",
                  label: "LinkedIn",
                  value: "dhruvsharma0506",
                  href: "https://www.linkedin.com/in/dhruvsharma0506",
                },
                {
                  icon: "🐙",
                  label: "GitHub",
                  value: "dhruvsharmads0506",
                  href: "https://github.com/dhruvsharmads0506",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                  <div>
                    <div style={{ color: mutedFg, fontSize: "0.75rem" }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: isDark ? "#00e5a8" : accent,
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ color: fg, fontSize: "0.9rem" }}>
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div
              style={{
                background: isDark ? "#0f172a" : cardBg,
                border: `1px solid ${cardBorder}`,
                borderRadius: 14,
                padding: "2rem",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  color: isDark ? "#00e5a8" : accent,
                  marginBottom: "1.5rem",
                  fontSize: "1.1rem",
                }}
              >
                Send a Message
              </h3>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: mutedFg,
                      marginBottom: "0.4rem",
                    }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    data-ocid="contact.name.input"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Your name"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: inputBg,
                      border: `1px solid ${inputBorder}`,
                      borderRadius: 8,
                      color: fg,
                      fontSize: "0.9rem",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: mutedFg,
                      marginBottom: "0.4rem",
                    }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    data-ocid="contact.email.input"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: inputBg,
                      border: `1px solid ${inputBorder}`,
                      borderRadius: 8,
                      color: fg,
                      fontSize: "0.9rem",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: mutedFg,
                      marginBottom: "0.4rem",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    data-ocid="contact.message.textarea"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Your message..."
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: inputBg,
                      border: `1px solid ${inputBorder}`,
                      borderRadius: 8,
                      color: fg,
                      fontSize: "0.9rem",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                {formStatus === "success" && (
                  <div
                    data-ocid="contact.success_state"
                    style={{
                      background: isDark ? "#00e5a820" : "#f0fdf4",
                      border: "1px solid #86efac",
                      borderRadius: 8,
                      padding: "0.75rem 1rem",
                      color: isDark ? "#00e5a8" : "#16a34a",
                      fontSize: "0.9rem",
                      textAlign: "center",
                    }}
                  >
                    ✓ Message sent! I'll get back to you soon.
                  </div>
                )}
                {formStatus === "error" && (
                  <div
                    data-ocid="contact.error_state"
                    style={{
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: 8,
                      padding: "0.75rem 1rem",
                      color: "#dc2626",
                      fontSize: "0.9rem",
                      textAlign: "center",
                    }}
                  >
                    ✗ Something went wrong. Try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  data-ocid="contact.submit_button"
                  style={{
                    background: isDark ? "#00e5a8" : accent,
                    color: isDark ? "#020617" : "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "0.75rem",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor:
                      formStatus === "sending" ? "not-allowed" : "pointer",
                    opacity: formStatus === "sending" ? 0.7 : 1,
                    transition: "opacity 0.2s, transform 0.2s",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    if (formStatus !== "sending") {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  {formStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          background: isDark
            ? "linear-gradient(180deg, #020617 0%, #010812 100%)"
            : "#1e293b",
          color: isDark ? "#00e5a8" : "#94a3b8",
          borderTop: isDark ? "1px solid rgba(0,229,168,0.12)" : "none",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p
            style={{
              fontWeight: 700,
              fontSize: "1.1rem",
              color: isDark ? "#00e5a8" : "#f1f5f9",
              marginBottom: "1rem",
            }}
          >
            Dhruv Sharma
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <a
              href="https://github.com/dhruvsharmads0506"
              target="_blank"
              rel="noreferrer"
              data-ocid="footer.github.link"
              style={{
                color: isDark ? "#00e5a8" : "#94a3b8",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = isDark
                  ? "#fff"
                  : "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = isDark
                  ? "#00e5a8"
                  : "#94a3b8";
              }}
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/dhruvsharma0506"
              target="_blank"
              rel="noreferrer"
              data-ocid="footer.linkedin.link"
              style={{
                color: isDark ? "#00e5a8" : "#94a3b8",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#0a66c2";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = isDark
                  ? "#00e5a8"
                  : "#94a3b8";
              }}
            >
              <LinkedInIcon />
            </a>
            <a
              href="mailto:dhruvsharmads0506@gmail.com"
              data-ocid="footer.email.link"
              style={{
                color: isDark ? "#00e5a8" : "#94a3b8",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = isDark
                  ? "#fff"
                  : "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = isDark
                  ? "#00e5a8"
                  : "#94a3b8";
              }}
            >
              <EmailIcon />
            </a>
            <a
              href="https://www.instagram.com/dhruv_s_0506"
              target="_blank"
              rel="noreferrer"
              data-ocid="footer.instagram.link"
              style={{
                color: isDark ? "#00e5a8" : "#94a3b8",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#e1306c";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = isDark
                  ? "#00e5a8"
                  : "#94a3b8";
              }}
            >
              <InstagramIcon />
            </a>
          </div>
          <p style={{ fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} Dhruv Sharma. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
