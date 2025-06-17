"use client";

import { motion } from "framer-motion";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useState, useEffect } from "react";
import Link from "next/link";
import WorkExperience from "@/components/WorkExperience";
import Education from "@/components/Education";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaDiscord, FaTelegram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaFileAlt, FaDownload, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import { SiArtstation } from 'react-icons/si';
import Head from "next/head";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  technologies: string[];
  github?: string;
  demo?: string;
  video?: string;
}

interface Skill {
  name: string;
}

interface Button {
  id: string;
  name: string;
  url: string;
  icon: string;
  order: number;
  isActive: boolean;
  customIconUrl?: string;
}

// Video Modal bileşeni
const VideoModal = ({ videoUrl, onClose }: { videoUrl: string; onClose: () => void }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full">
        <iframe
          src={videoUrl}
          className="w-full aspect-video"
          allow="autoplay"
          allowFullScreen
        />
        <button 
          className="absolute -top-12 right-0 text-white hover:text-gray-300"
          onClick={onClose}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buttons, setButtons] = useState<Button[]>([]);
  const [heroText, setHeroText] = useState({
    name: "Mustafa Erçin",
    titles: ["Game Designer", "Level Designer"]
  });
  const [pageTitle, setPageTitle] = useState("Mustafa Erçin - Game & Level Designer");
  const [copyrightText, setCopyrightText] = useState("© 2025 Mustafa Erçin. All rights reserved.");
  const [aboutText, setAboutText] = useState({
    paragraph1: "I graduated with a degree in Game Design, with a strong foundation in game mechanics, user experience, and creative game development. I possess experience in analyzing KPIs and conducting market research to inform game development.",
    paragraph2: "As a quick learner and dedicated team player, I am eager to apply my skills to contribute innovative ideas and collaborate within a dynamic team. Committed to continuous growth in the game design field, I am passionate about creating engaging and immersive gaming experiences. While my expertise spans various areas, my primary focus has been in level design, where I have developed a strong ability to craft engaging, balanced, and immersive game levels."
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [contactInfo, setContactInfo] = useState({
    email: "mustafaercin@gmail.com",
    phone: "+905340180861",
    linkedin: "https://linkedin.com/in/mustafaercin",
    github: "https://github.com/mustafaercin"
  });
  const [profileImage, setProfileImage] = useState("/me.jpeg");
  const [scrollIndicator, setScrollIndicator] = useState({
    enabled: true,
    color: "#007bff",
    size: "2rem"
  });
  const [colorPalette, setColorPalette] = useState({
    primary: "#6366f1",
    primaryHover: "#818cf8",
    dark: "#0f172a",
    light: "#ffffff",
    gradientStart: "rgba(15, 23, 42, 0.95)",
    gradientEnd: "rgba(99, 102, 241, 0.1)",
    cardBg: "rgba(15, 23, 42, 0.7)",
    cardBorder: "rgba(255, 255, 255, 0.1)"
  });
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [titleTypingComplete, setTitleTypingComplete] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaDiscord,
    FaTelegram,
    FaWhatsapp,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaGlobe,
    FaFileAlt,
    FaDownload,
    FaExternalLinkAlt,
    SiArtstation,
    FaPlay
  };

  // Veri yükleme fonksiyonu
  const fetchData = async () => {
    try {
      const response = await fetch('/data.json');
      if (!response.ok) {
        throw new Error('Veri yüklenemedi');
      }
      const jsonData = await response.json();
      setData(jsonData);
      
      // State'leri güncelle
      setHeroText(jsonData.heroText || { name: "", titles: [] });
      setPageTitle(jsonData.pageTitle || "");
      setCopyrightText(jsonData.copyrightText || "");
      setAboutText(jsonData.aboutText || { paragraph1: "", paragraph2: "" });
      setProjects(jsonData.projects || []);
      setSkills(jsonData.skills || []);
      setContactInfo(jsonData.contactInfo || {});
      setProfileImage(jsonData.profileImage || "");
      setColorPalette(jsonData.colorPalette || {});
      setButtons(jsonData.buttons || []);
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update CSS variables when color palette changes
  useEffect(() => {
    document.documentElement.style.setProperty('--bs-primary', colorPalette.primary);
    document.documentElement.style.setProperty('--bs-primary-rgb', hexToRgb(colorPalette.primary));
    document.documentElement.style.setProperty('--bs-dark', colorPalette.dark);
    document.documentElement.style.setProperty('--bs-dark-rgb', hexToRgb(colorPalette.dark));
    document.documentElement.style.setProperty('--bs-light', colorPalette.light);
    document.documentElement.style.setProperty('--bs-light-rgb', hexToRgb(colorPalette.light));
  }, [colorPalette]);

  // Typewriter effect
  useEffect(() => {
    const typeWriter = () => {
      const currentText = heroText.titles[currentTextIndex];
      
      if (isWaiting) return;

      if (!isDeleting && text === currentText) {
        setIsWaiting(true);
        setTimeout(() => {
          setIsDeleting(true);
          setIsWaiting(false);
        }, 1000);
        return;
      }

      if (isDeleting && text === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % heroText.titles.length);
        return;
      }

      const delta = isDeleting ? -1 : 1;
      const nextText = currentText.slice(0, text.length + delta);
      setText(nextText);
    };

    const timer = setTimeout(typeWriter, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [text, isDeleting, isWaiting, currentTextIndex, heroText.titles]);

  // Helper function to convert hex to rgb
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const typewriterVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cursorVariants = {
    blinking: {
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  // Update page title when it changes
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="alert alert-danger" role="alert">
          Veriler yüklenemedi. Lütfen sayfayı yenileyin.
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Mustafa Erçin - Game & Level Designer Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="hero-section position-relative vh-100 d-flex align-items-center justify-content-center">
          <Container className="position-relative z-3 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              transition={{ duration: 0.8, delayChildren: 0.2, staggerChildren: 0.1 }}
            >
              <div className="typewriter-container" style={{ display: "inline-block" }}>
                <motion.h1 
                  className="display-3 fw-bold mb-4"
                  variants={typewriterVariants}
                  style={{ display: "inline-block" }}
                >
                  {`Hi, I'm ${heroText.name}`.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.1,
                        delay: index * 0.1,
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>
              </div>
              <motion.p className="lead mb-4" variants={textVariants}>
                <span style={{ display: "inline-block", minWidth: "200px" }}>
                  {text}
                  <motion.span
                    className="typewriter-cursor"
                    variants={cursorVariants}
                    animate="blinking"
                    style={{
                      display: "inline-block",
                      width: "3px",
                      height: "1em",
                      backgroundColor: "currentColor",
                      marginLeft: "2px",
                      verticalAlign: "middle",
                    }}
                  />
                </span>
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={textVariants}
              >
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="rounded-pill px-5"
                  onClick={scrollToProjects}
                >
                  View My Work
                </Button>
              </motion.div>

              <motion.div 
                className="d-flex gap-4 mt-4 justify-content-center"
                variants={containerVariants}
              >
                {buttons
                  .filter(button => button.isActive)
                  .sort((a, b) => a.order - b.order)
                  .map(button => {
                    const Icon = iconMap[button.icon];
                    return (
                      <Button
                        key={button.id}
                        variant="outline-light"
                        size="lg"
                        className="rounded-pill px-4 d-flex align-items-center gap-2"
                        onClick={() => window.open(button.url, '_blank')}
                      >
                        {button.icon === 'custom' && button.customIconUrl ? (
                          <img 
                            src={button.customIconUrl} 
                            alt={button.name}
                            style={{ width: '24px', height: '24px' }} 
                          />
                        ) : (
                          Icon && <Icon className="fs-4" />
                        )}
                        {button.name}
                      </Button>
                    );
                  })}
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* Projects Section */}
        <ScrollReveal>
          <section id="projects" className="py-5 section-dark">
            <Container>
              <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                <motion.h2 className="display-4 text-center mb-5" variants={textVariants}>Featured Projects</motion.h2>
                <div className="position-relative">
                  {scrollIndicator.enabled && (
                    <motion.div
                      className="scroll-indicator"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        x: [0, 20, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                      style={{
                        position: "absolute",
                        right: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        color: scrollIndicator.color,
                        fontSize: scrollIndicator.size,
                        pointerEvents: "none"
                      }}
                    >
                      <i className="bi bi-arrow-right-circle-fill"></i>
                    </motion.div>
                  )}
                  <div 
                    className="projects-container" 
                    style={{ 
                      display: "flex",
                      flexWrap: "nowrap",
                      gap: "1.5rem",
                      maxHeight: "800px",
                      overflowX: "auto",
                      overflowY: "hidden",
                      padding: "1rem 0",
                      scrollSnapType: "x mandatory",
                      scrollbarWidth: "thin",
                      scrollbarColor: "#007bff #1a1a1a",
                      WebkitOverflowScrolling: "touch"
                    }}
                  >
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-full sm:w-1/2 lg:w-1/3 p-4"
                      >
                        <Card className="h-full flex flex-col">
                          <Card.Img
                            variant="top"
                            src={project.image}
                            alt={project.title}
                            className="h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedImage(project.image)}
                          />
                          <Card.Body className="flex flex-col flex-grow">
                            <Card.Title className="text-xl font-bold mb-2">
                              {project.title}
                            </Card.Title>
                            <div className="text-gray-600 mb-4 flex-grow overflow-y-auto max-h-48">
                              {project.description}
                            </div>
                            <div className="mt-auto">
                              <div className="flex flex-wrap gap-2 mb-3">
                                {project.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                {project.github && (
                                  <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900"
                                  >
                                    <FaGithub size={20} />
                                  </a>
                                )}
                                {project.demo && (
                                  <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900"
                                  >
                                    <FaExternalLinkAlt size={20} />
                                  </a>
                                )}
                                {project.video && (
                                  <button
                                    onClick={() => project.video && setSelectedVideo(project.video)}
                                    className="text-gray-600 hover:text-gray-900"
                                  >
                                    <FaPlay size={20} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Container>
          </section>
        </ScrollReveal>

        {/* Work Experience */}
        <WorkExperience />

        {/* Education */}
        <Education />

        {/* About Section */}
        <ScrollReveal delay={0.4}>
          <section id="about" className="py-5">
            <Container>
              <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                <motion.h2 className="display-4 text-center mb-5" variants={textVariants}>About Me</motion.h2>
                <Row className="align-items-center g-5">
                  <Col lg={6}>
                    <motion.p className="lead mb-4" variants={textVariants}>
                      {aboutText.paragraph1}
                    </motion.p>
                    <motion.p className="lead mb-4" variants={textVariants}>
                      {aboutText.paragraph2}
                    </motion.p>
                    <div className="skills-section">
                      <motion.h3 className="h2 mb-4" variants={textVariants}>Core Competencies</motion.h3>
                      <motion.div 
                         className="d-flex flex-wrap gap-2" 
                         variants={containerVariants}
                         initial="hidden"
                         animate="visible"
                      >
                        {skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            className="badge rounded-pill bg-primary"
                            variants={textVariants}
                            style={{ color: "#f8f9fa" }}
                          >
                            {skill.name}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <motion.div className="ratio ratio-1x1 rounded-4 overflow-hidden shadow-lg" variants={textVariants}>
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="object-fit-cover"
                      />
                    </motion.div>
                  </Col>
                </Row>
              </motion.div>
            </Container>
          </section>
        </ScrollReveal>

        {/* Contact Section */}
        <section id="contact" className="py-5 section-light">
          <Container className="max-w-3xl">
            <div className="d-flex justify-content-center gap-5">
              <div className="text-center">
                <i className="bi bi-envelope-fill fs-1 mb-3" style={{ color: "#ffffff" }}></i>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-light text-decoration-none fs-5 d-block"
                  style={{
                    color: "#00ff88",
                    transition: "color 0.3s ease"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#007bff"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#00ff88"}
                >
                  {contactInfo.email}
                </a>
              </div>

              <div className="text-center">
                <i className="bi bi-telephone-fill fs-1 mb-3" style={{ color: "#ffffff" }}></i>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-light text-decoration-none fs-5 d-block"
                  style={{
                    color: "#00ff88",
                    transition: "color 0.3s ease"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#007bff"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#00ff88"}
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer copyrightText={copyrightText} />

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img 
              src={selectedImage} 
              alt="Full size" 
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal 
          videoUrl={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </>
  );
}