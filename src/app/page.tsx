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
  const [buttons, setButtons] = useState<Button[]>([
    {
      id: '1',
      name: 'GitHub',
      url: 'https://github.com/mustafa-ercin',
      icon: 'FaGithub',
      order: 1,
      isActive: true
    },
    {
      id: '2',
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mustafa-ercin',
      icon: 'FaLinkedin',
      order: 2,
      isActive: true
    },
    {
      id: '3',
      name: 'ArtStation',
      url: 'https://www.artstation.com/erchin',
      icon: 'SiArtstation',
      order: 3,
      isActive: true
    },
    {
      id: '4',
      name: 'Drive',
      url: 'https://drive.google.com/drive/folders/1fYuX47ne7m4R2-AkNs95qU-BDXLaWQaR?usp=drive_link',
      icon: 'FaGlobe',
      order: 4,
      isActive: true
    }
  ]);
  const [heroText, setHeroText] = useState({
    name: "Mustafa Erçin",
    titles: ["Product Specialist", "Game Designer"]
  });
  const [pageTitle, setPageTitle] = useState("Mustafa Erçin - Product Specialist & Game Designer");
  const [copyrightText, setCopyrightText] = useState("© 2025 Mustafa Erçin. All rights reserved.");
  const [aboutText, setAboutText] = useState({
    paragraph1: "I am a passionate and multidisciplinary Game Designer with a background in both creative and technical aspects of development. With a degree in Digital Game Design and hands-on experience in Level Design, QA testing, and user-focused design, I thrive in environments that require both innovation and precision.",
    paragraph2: "I have contributed to projects ranging from VR military training simulations to mobile and PC puzzle games, always with a focus on creating meaningful player experiences. My work often bridges the gap between gameplay mechanics, user behavior, and technical feasibility. Whether I am designing levels, improving UX, conducting market research, or guiding product development, I approach each challenge with curiosity and a solution-oriented mindset.\n\nI believe in the power of collaboration and continuous learning, and I'm always excited to turn creative ideas into real, impactful products."
  });
  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "Slide Cubes",
      description: "Slide Cubes is a mobile puzzle game developed in portrait mode, where players must guide a round character to a target point within a limited time. With each move, the character advances only one tile in the chosen direction, requiring quick thinking and strategic planning. I was responsible for the core gameplay mechanics, level design, and puzzle progression. In addition to designing the game, I managed a small development team, ensuring smooth collaboration and steady progress. This project highlights my ability to craft engaging gameplay experiences while effectively leading a game development process.",
      image: "https://media.licdn.com/dms/image/v2/D4D2DAQEOeY_HbeBfzQ/profile-treasury-image-shrink_8192_8192/B4DZbZMYmfIAAg-/0/1747400624942?e=1750773600&v=beta&t=Qaq6wI0mKj-N00C3u8q2FJOUQJtzP7CwZVRY6kuJKAc",
      video: "https://www.youtube.com/embed/ro33kIcsh8g",
      tags: ["Project Management", "Unity", "QA", "Figma", "Game Design"],
      github: "",
      demo: ""
    },
    {
      id: "2",
      title: "Inter Island",
      description: "Inter Island is a PC game where players take on the role of a merchant navigating between islands with diverse climates to trade resources and goods. As the Project Manager, I oversaw the development process from concept to completion, taking responsibility for game design, environment design, level design, and UI design. Each island was crafted to offer a distinct and immersive atmosphere, influencing both gameplay and trade dynamics. I coordinated cross-functional teams, managed resources, and ensured the on-time delivery of polished gameplay systems. The game features a dynamic trading system, strategic resource management, and an intuitive user interface that enhances the player's experience while traveling across richly detailed environments. This project reflects my ability to lead a multidisciplinary team and deliver a cohesive and engaging gameplay experience.",
      image: "https://media.licdn.com/dms/image/v2/D4D2DAQGyaJJGMJctdw/profile-treasury-image-shrink_800_800/B4DZd.C0.hGkAY-/0/1750166360722?e=1750773600&v=beta&t=Ufl8CNoSTlT7rBysglMaPdBLQYAG9gSTmsv2h8En2Lk",
      video: "https://www.youtube.com/embed/N30n2XWf5JQ",
      tags: ["Project Management", "UI", "Unity", "QA", "Figma", "Game Design", "Level Design"],
      github: "",
      demo: ""
    },
    {
      id: "3",
      title: "TacticXR",
      description: "TacticXR is a virtual reality tactical training simulation developed for military personnel. In this project, I contributed to the design of large-scale training environments and mission-based scenarios, while also implementing localization systems and real-time multi-personnel monitoring panels. I conducted user training sessions to ensure an interactive and effective learning experience tailored to operational needs. Additionally, I managed research and development activities, gathered and integrated customer requirements, and oversaw testing and bug-fixing processes to maintain high performance and reliability. This project reflects my ability to combine technical execution with user-centered design in a complex, real-time VR environment.",
      image: "https://www.adtairdefence.com/foto/1733395313-DSC_2280-Enhanced.png",
      video: "https://www.youtube.com/embed/nAqCyLrWEAw",
      tags: ["Unity", "QA", "Figma", "Simulation", "Level Design", "VR", "UI"],
      github: "",
      demo: ""
    },
    {
      id: "4",
      title: "PizzaPit",
      description: "PizzaPit is a fast-paced cooking simulation game where players step into the role of a pizza chef, crafting customized pizzas based on incoming customer orders. As players race against time, they must manage ingredients, respond to dynamic requests, and ensure each pizza is prepared and baked to perfection. I was responsible for 3D modeling, level design, and gameplay mechanics. My work focused on building an immersive pizza preparation experience with intuitive and engaging customer interactions, as well as designing levels that balance time management, strategic thinking, and fun. This project highlights my ability to combine creative gameplay design with strong visual and interactive elements to deliver a satisfying user experience.",
      image: "https://img.freepik.com/free-psd/3d-rendering-delicious-pizza-slice_23-2149108555.jpg?semt=ais_hybrid&w=740",
      video: "",
      tags: ["Unity", "QA", "Level Design", "UI"],
      github: "",
      demo: "https://drive.google.com/drive/folders/1JgFQpuURDyQhfM7JCYVxfYDkMigEtQuR?usp=drive_link"
    },
    {
      id: "5",
      title: "Reverbs2Mind",
      description: "The game follows a protagonist who awakens from a vivid dream and is drawn into a surreal journey guided by a mysterious voice. Upon following the voice's instructions and interacting with a computer, the character is transported into a digital world where they must locate and dispose of a specific outfit. As the narrative unfolds, players navigate through a series of challenges that blur the line between dreams and reality. I was responsible for the UI/UX design, gameplay development, and level design. My work focused on crafting a seamless and immersive interface, implementing core mechanics, and designing levels that offer both narrative depth and intellectual challenge. This project showcases my ability to blend storytelling with interactive design, creating an engaging experience that evolves as the player progresses.",
      image: "https://img.itch.zone/aW1hZ2UvMTg1MTMzMC8xMDg2NzQyOC5wbmc=/original/VwPGYh.png",
      video: "",
      tags: ["Unity", "Game Design", "Design", "UI"],
      github: "",
      demo: "https://erchin.itch.io/reverb2mind"
    },
    {
      id: "6",
      title: "WTF!? : The Room",
      description: "This game offers players a thought-provoking journey filled with complex puzzles and evolving challenges. In each room, players must find a way forward by utilizing a special power—one that they cannot fully control. When approached strategically, this power becomes the key to success. The experience requires a balance of intelligence and strategy, pushing players to think critically and adapt constantly. I was responsible for level design, game mechanics, and UI design. Every aspect of the game was carefully crafted to provide an immersive, mentally engaging experience that rewards thoughtful gameplay and encourages players to develop new problem-solving approaches.",
      image: "https://img.itch.zone/aW1hZ2UvMjcxODkzMi8xNjIxMDg3OS5wbmc=/original/UGTLLW.png",
      video: "https://www.youtube.com/embed/Oi19WSrIGD4",
      tags: ["Unity", "Game Design", "Design", "UI"],
      github: "",
      demo: "https://emirozger.itch.io/wtf-the-room"
    },
    {
      id: "7",
      title: "Kitchen Chaos (clone)",
      description: "A clone of the fast-paced cooking game Kitchen Chaos, developed to practice time-sensitive task management, player input handling, and kitchen station interactions. I implemented core gameplay systems such as recipe logic, order timers, and UI feedback to simulate an engaging kitchen experience.",
      image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2275820/ss_872ca7604865c2303adef48a1ef0ea176b12c2a5.1920x1080.jpg?t=1725190944",
      video: "https://www.youtube.com/embed/gc5mdfBXcCA",
      tags: ["Unity", "Game Design", "Design", "UI", "C#"],
      github: "",
      demo: ""
    },
    {
      id: "8",
      title: "ZigZag (clone)",
      description: "A clone of the popular endless arcade game ZigZag, created to strengthen my skills in mobile-friendly input systems, procedural level generation, and score tracking. This project allowed me to explore smooth character movement along dynamic paths and responsive gameplay loops.",
      image: "https://play-lh.googleusercontent.com/6pyha8P40IH8Yn7ets-yr-sDmze-lif7Lh80ZMffdBojvhAtGTk88zHru3UHeipNhA",
      video: "https://www.youtube.com/embed/nGj_PXC3bgw",
      tags: ["Unity", "Game Design", "Design", "UI", "C#"],
      github: "",
      demo: ""
    },
    {
      id: "9",
      title: "Ship Park Master",
      description: "A puzzle game where players draw paths to park ships safely at their correct colored spots without collisions. I designed the gameplay and created levels with increasing difficulty that emphasize strategy and timing.",
      image: "https://i.hizliresim.com/opuubqh.png",
      video: "https://www.youtube.com/embed/7ps5wZ8ohys",
      tags: ["Unity", "Game Design", "Design", "UI", "Level Design"],
      github: "",
      demo: ""
    }
  ]);
  const [skills, setSkills] = useState([
    { name: "Unity", percentage: 90, color: "#6366f1", order: 1, isActive: true },
    { name: "C#", percentage: 85, color: "#818cf8", order: 2, isActive: true },
    { name: "Trello", percentage: 80, color: "#0079bf", order: 3, isActive: true },
    { name: "Miro", percentage: 80, color: "#ffd02f", order: 4, isActive: true },
    { name: "QA", percentage: 85, color: "#0f172a", order: 5, isActive: true },
    { name: "Figma", percentage: 80, color: "#a259ff", order: 6, isActive: true },
    { name: "Photoshop", percentage: 75, color: "#31a8ff", order: 7, isActive: true },
    { name: "Project Management", percentage: 85, color: "#6366f1", order: 8, isActive: true },
    { name: "Agile", percentage: 80, color: "#0f172a", order: 9, isActive: true },
    { name: "Game Design", percentage: 90, color: "#6366f1", order: 10, isActive: true },
    { name: "Level Design", percentage: 95, color: "#0f172a", order: 11, isActive: true }
  ]);
  const [education, setEducation] = useState([
    {
      school: "Istanbul Aydin University",
      degree: "Bachelor's Degree",
      field: "Digital Game Design",
      duration: "2020 – 2024",
      location: "Istanbul",
      description: ""
    },
    {
      school: "Istanbul University",
      degree: "Associate's Degree",
      field: "Graphic Design",
      duration: "2024 – Present",
      location: "Remote",
      description: ""
    }
  ]);
  const [contactInfo, setContactInfo] = useState({
    email: "mustafaercin3334@gmail.com",
    phone: "+905434132393",
    linkedin: "https://linkedin.com/in/mustafa-ercin",
    github: "https://github.com/mustafa-ercin"
  });
  const [profileImage, setProfileImage] = useState("https://media.licdn.com/dms/image/v2/D4D03AQHaqYnZioUejg/profile-displayphoto-shrink_800_800/B4DZb0vNgjGwAg-/0/1747862739893?e=1753920000&v=beta&t=eoha5VFiokuW0UmMDcoesx9t_CfSNoZPskAVertBLF8");
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
  const [logoText, setLogoText] = useState("Portfolio");
  const [logoColors, setLogoColors] = useState({ start: "#6366f1", end: "#818cf8" });

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

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Mustafa Erçin - Game & Game Designer Portfolio" />
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
                className="d-flex gap-4 mt-4 justify-content-center flex-wrap"
                variants={containerVariants}
                style={{ rowGap: '1rem', columnGap: '1rem' }}
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
                        className="rounded-pill px-4 d-flex align-items-center gap-2 mb-2"
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
        <WorkExperience experiences={[
  {
    company: "UDO",
    position: "Gamer Design Intern",
    duration: "Jul 2025 – Present · 1 month",
    description: "Conducted data-driven research to design a mobile game aligned with market trends and user expectations. Led coordination between art and development teams, ensuring smooth collaboration through structured sprints. Regularly presented design progress to the Lead Game Designer; implemented feedback effectively, and contributed to iterative improvements in the game's core experience.",
    location: "Remote"
  },
  {
    company: "ADT Aviation and Defense Technologies",
    position: "Unity Developer / Product Specialist",
    duration: "Sep 2024 – May 2025",
    description: "● Created gamified VR training simulations focusing on UX and user interaction. \n● Designed UI/UX and led localization for multi-language support. \n● Designed and iterated puzzle mechanics using player feedback and analytics.  \n● Performed QA testing, resolving bugs for stable, user-ready releases.",
    location: "Istanbul"
  },
  {
    company: "Boem Games",
    position: "Co-Founder & Project Manager",
    duration: "Feb 2024 – Aug 2024",
    description: "● Led the development of Unity-based hyper-casual and casual mobile game prototypes. \n● Designed and iterated puzzle mechanics with a focus on player engagement and retention. \n● Conducted A/B tests and gameplay tuning to improve LTV and session duration. \n● Managed agile sprints, ensuring milestone deliveries with a small multidisciplinary team.",
    location: "Istanbul"
  },
  {
    company: "SkyBlue Games",
    position: "Game Designer Intern",
    duration: "May 2022 - Jan 2023",
    description: "● Assisted in GDD creation and prototyping for hyper-casual games. \n● Conducted QA testing to improve player engagement and retention.",
    location: "Remote"
  },
  {
    company: "Istanbul Aydin University",
    position: "Game Designer Intern",
    duration: "",
    description: "Worked on student game projects using Unity, C#, and Figma. Focused on gameplay mechanics, UI mockups, and collaborative development with cross-functional teams.",
    location: "Istanbul"
  }
]} />

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